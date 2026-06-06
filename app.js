const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const canvas = document.getElementById("imageCanvas");
const emptyPreview = document.getElementById("emptyPreview");
const tagTableBody = document.getElementById("tagTableBody");
const tagSearch = document.getElementById("tagSearch");
const tagCount = document.getElementById("tagCount");
const copyButton = document.getElementById("copyButton");
const downloadButton = document.getElementById("downloadButton");
const resetViewButton = document.getElementById("resetViewButton");
const statusBadge = document.getElementById("statusBadge");
const warnings = document.getElementById("warnings");
const previewDetails = document.getElementById("previewDetails");
const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");

const patientName = document.getElementById("patientName");
const patientId = document.getElementById("patientId");
const modality = document.getElementById("modality");
const studyDate = document.getElementById("studyDate");
const manufacturer = document.getElementById("manufacturer");
const imageSize = document.getElementById("imageSize");
const transferSyntax = document.getElementById("transferSyntax");

let lastMetadata = {};
let lastRows = [];
let lastFileName = "dicom-metadata";

function setStatus(text) {
  statusBadge.textContent = text;
}

function activateTab(tabId) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabId);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function showWarnings(items) {
  warnings.hidden = !items.length;
  warnings.innerHTML = items.map((item) => `<p>${escapeHtml(item)}</p>`).join("");
}

function elementValue(parsed, key, fallback = "-") {
  return parsed.elements[key]?.value || fallback;
}

function metadataJson(parsed) {
  const result = {};
  for (const element of parsed.ordered) {
    const info = parsed.elements[element.key] || {};
    result[`${info.displayTag || `(${element.key})`} ${info.name || "Unknown DICOM tag"}`.trim()] = info.value;
  }
  return result;
}

function formatValue(value) {
  if (Array.isArray(value)) return value.join("\\");
  if (value && typeof value === "object") return JSON.stringify(value);
  return String(value ?? "");
}

function tagRows(parsed) {
  return parsed.ordered.map((element) => {
    const info = parsed.elements[element.key] || {};
    return {
      key: info.displayTag || `(${element.key.toUpperCase()})`,
      rawKey: element.key.toUpperCase(),
      name: info.name || "Unknown DICOM tag",
      nameKind: info.name?.startsWith("Private") ? "private" : info.name?.startsWith("Unknown") ? "unknown" : "standard",
      vr: element.vr,
      length: element.length === 0xffffffff ? "Undefined" : String(element.length),
      value: formatValue(info.value)
    };
  });
}

function renderTagTable(rows) {
  tagCount.textContent = `${rows.length} tag${rows.length === 1 ? "" : "s"} shown`;
  if (!rows.length) {
    tagTableBody.innerHTML = '<tr><td colspan="5" class="empty-tags">No tags match this search.</td></tr>';
    return;
  }
  tagTableBody.innerHTML = rows.map((row) => `
    <tr>
      <td class="tag-key">${escapeHtml(row.key)}</td>
      <td class="tag-name ${escapeHtml(row.nameKind)}">${escapeHtml(row.name)}</td>
      <td class="tag-vr">${escapeHtml(row.vr)}</td>
      <td class="tag-length">${escapeHtml(row.length)}</td>
      <td class="tag-value">${escapeHtml(row.value)}</td>
    </tr>
  `).join("");
}

function applyTagFilter() {
  const query = tagSearch.value.trim().toLowerCase();
  if (!query) {
    renderTagTable(lastRows);
    return;
  }
  renderTagTable(lastRows.filter((row) =>
    row.key.toLowerCase().includes(query)
    || row.rawKey.toLowerCase().includes(query)
    || row.name.toLowerCase().includes(query)
    || row.vr.toLowerCase().includes(query)
    || row.value.toLowerCase().includes(query)
  ));
}

function safeFileBaseName(fileName) {
  return String(fileName || "dicom-metadata").replace(/\.[^.]+$/, "").replace(/[^a-z0-9_-]+/gi, "-");
}

async function readFile(file) {
  setStatus("Reading");
  lastFileName = safeFileBaseName(file.name);
  warnings.hidden = true;
  canvas.style.display = "none";
  emptyPreview.style.display = "block";
  emptyPreview.textContent = "Reading DICOM file...";
  previewDetails.textContent = "Parsing metadata and image data...";

  const buffer = await file.arrayBuffer();
  const parsed = window.DicomQuickReader.parseDicom(buffer);
  lastMetadata = metadataJson(parsed);
  lastRows = tagRows(parsed);

  patientName.textContent = String(elementValue(parsed, "0010,0010"));
  patientId.textContent = String(elementValue(parsed, "0010,0020"));
  modality.textContent = String(elementValue(parsed, "0008,0060"));
  studyDate.textContent = String(elementValue(parsed, "0008,0020"));
  manufacturer.textContent = String(elementValue(parsed, "0008,0070"));
  imageSize.textContent = `${elementValue(parsed, "0028,0011", "?")} x ${elementValue(parsed, "0028,0010", "?")}`;
  transferSyntax.textContent = String(elementValue(parsed, "0002,0010"));
  tagSearch.value = "";
  renderTagTable(lastRows);

  const localWarnings = [...parsed.warnings];
  try {
    const renderInfo = window.DicomQuickReader.renderToCanvas(parsed, canvas);
    canvas.style.display = "block";
    emptyPreview.style.display = "none";
    imageSize.textContent = `${renderInfo.columns} x ${renderInfo.rows}`;
    previewDetails.textContent = `Rendered ${renderInfo.columns} x ${renderInfo.rows}, ${renderInfo.bitsAllocated}-bit grayscale. Window ${Math.round(renderInfo.windowCenter)} / ${Math.round(renderInfo.windowWidth)}.`;
    setStatus("Rendered");
  } catch (error) {
    localWarnings.push(error.message);
    emptyPreview.textContent = "Preview unavailable. Metadata was parsed successfully.";
    previewDetails.textContent = "Metadata parsed. Image preview is unavailable for this file.";
    setStatus("Metadata");
  }
  showWarnings(localWarnings);
}

function handleFiles(files) {
  const file = files?.[0];
  if (!file) return;
  readFile(file).catch((error) => {
    setStatus("Error");
    emptyPreview.textContent = "Could not parse this DICOM file.";
    previewDetails.textContent = "Parsing failed.";
    showWarnings([error.message]);
  });
}

function downloadJson() {
  const blob = new Blob([JSON.stringify(lastMetadata, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${lastFileName || "dicom-metadata"}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

fileInput.addEventListener("change", () => handleFiles(fileInput.files));

dropZone.addEventListener("dragover", (event) => {
  event.preventDefault();
  dropZone.classList.add("dragging");
});

dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragging");
});

dropZone.addEventListener("drop", (event) => {
  event.preventDefault();
  dropZone.classList.remove("dragging");
  handleFiles(event.dataTransfer.files);
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(JSON.stringify(lastMetadata, null, 2));
  setStatus("Copied");
  setTimeout(() => setStatus("Ready"), 1200);
});

downloadButton.addEventListener("click", downloadJson);
resetViewButton.addEventListener("click", () => {
  canvas.style.maxWidth = "100%";
  canvas.style.width = "";
});
tagSearch.addEventListener("input", applyTagFilter);
tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});
