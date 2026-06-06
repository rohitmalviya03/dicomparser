(function () {
  const TAGS = {
    "0002,0000": "File Meta Information Group Length",
    "0002,0001": "File Meta Information Version",
    "0002,0002": "Media Storage SOP Class UID",
    "0002,0003": "Media Storage SOP Instance UID",
    "0002,0010": "Transfer Syntax UID",
    "0002,0012": "Implementation Class UID",
    "0002,0013": "Implementation Version Name",
    "0008,0005": "Specific Character Set",
    "0008,0008": "Image Type",
    "0008,0016": "SOP Class UID",
    "0008,0018": "SOP Instance UID",
    "0008,0020": "Study Date",
    "0008,0021": "Series Date",
    "0008,0022": "Acquisition Date",
    "0008,0023": "Content Date",
    "0008,0030": "Study Time",
    "0008,0031": "Series Time",
    "0008,0032": "Acquisition Time",
    "0008,0033": "Content Time",
    "0008,0050": "Accession Number",
    "0008,0060": "Modality",
    "0008,0070": "Manufacturer",
    "0008,0080": "Institution Name",
    "0008,0090": "Referring Physician's Name",
    "0008,1110": "Referenced Study Sequence",
    "0008,1111": "Referenced Performed Procedure Step Sequence",
    "0008,1115": "Referenced Series Sequence",
    "0008,1120": "Referenced Patient Sequence",
    "0008,1140": "Referenced Image Sequence",
    "0008,1150": "Referenced SOP Class UID",
    "0008,1155": "Referenced SOP Instance UID",
    "0008,1010": "Station Name",
    "0008,1030": "Study Description",
    "0008,103e": "Series Description",
    "0008,1060": "Name of Physician(s) Reading Study",
    "0008,1070": "Operators' Name",
    "0008,1090": "Manufacturer's Model Name",
    "0010,0010": "Patient Name",
    "0010,0020": "Patient ID",
    "0010,0030": "Patient Birth Date",
    "0010,0040": "Patient Sex",
    "0010,1010": "Patient Age",
    "0010,1020": "Patient Size",
    "0010,1030": "Patient Weight",
    "0010,1000": "Other Patient IDs",
    "0010,1001": "Other Patient Names",
    "0010,2160": "Ethnic Group",
    "0010,4000": "Patient Comments",
    "0010,21b0": "Additional Patient History",
    "0018,0010": "Contrast/Bolus Agent",
    "0018,0015": "Body Part Examined",
    "0018,0020": "Scanning Sequence",
    "0018,0021": "Sequence Variant",
    "0018,0022": "Scan Options",
    "0018,0023": "MR Acquisition Type",
    "0018,0025": "Angio Flag",
    "0018,0050": "Slice Thickness",
    "0018,0080": "Repetition Time",
    "0018,0081": "Echo Time",
    "0018,0082": "Inversion Time",
    "0018,0083": "Number of Averages",
    "0018,0084": "Imaging Frequency",
    "0018,0085": "Imaged Nucleus",
    "0018,0086": "Echo Number(s)",
    "0018,0087": "Magnetic Field Strength",
    "0018,0088": "Spacing Between Slices",
    "0018,0091": "Echo Train Length",
    "0018,0093": "Percent Sampling",
    "0018,0094": "Percent Phase Field of View",
    "0018,0095": "Pixel Bandwidth",
    "0018,1000": "Device Serial Number",
    "0018,1020": "Software Versions",
    "0018,1030": "Protocol Name",
    "0018,1088": "Heart Rate",
    "0018,1090": "Cardiac Number of Images",
    "0018,1094": "Trigger Window",
    "0018,1100": "Reconstruction Diameter",
    "0018,1250": "Receive Coil Name",
    "0018,1310": "Acquisition Matrix",
    "0018,1312": "In-plane Phase Encoding Direction",
    "0018,1314": "Flip Angle",
    "0018,1315": "Variable Flip Angle Flag",
    "0018,1316": "SAR",
    "0018,5100": "Patient Position",
    "0018,9005": "Pulse Sequence Name",
    "0018,9008": "Echo Pulse Sequence",
    "0018,9012": "MR Timing and Related Parameters Sequence",
    "0018,9014": "MR Echo Sequence",
    "0018,9015": "MR Modifier Sequence",
    "0018,9017": "Steady State Pulse Sequence",
    "0018,9018": "Echo Planar Pulse Sequence",
    "0018,9020": "Magnetization Transfer",
    "0018,9021": "T2 Preparation",
    "0018,9022": "Blood Signal Nulling",
    "0018,9024": "Saturation Recovery",
    "0018,9025": "Spectrally Selected Suppression",
    "0018,9026": "Spectrally Selected Excitation",
    "0018,9027": "Spatial Pre-saturation",
    "0018,9028": "Tagging",
    "0018,9029": "Oversampling Phase",
    "0018,9032": "Geometry of k-Space Traversal",
    "0018,9033": "Segmented k-Space Traversal",
    "0018,9034": "Rectilinear Phase Encode Reordering",
    "0018,9035": "Tag Thickness",
    "0018,9036": "Partial Fourier Direction",
    "0018,9037": "Cardiac Synchronization Technique",
    "0018,9041": "Receive Coil Manufacturer Name",
    "0018,9042": "MR Receive Coil Sequence",
    "0018,9043": "Receive Coil Type",
    "0018,9044": "Quadrature Receive Coil",
    "0018,9045": "Multi-Coil Definition Sequence",
    "0018,9046": "Multi-Coil Configuration",
    "0018,9047": "Multi-Coil Element Name",
    "0018,9048": "Multi-Coil Element Used",
    "0018,9049": "MR Transmit Coil Sequence",
    "0018,9050": "Transmit Coil Manufacturer Name",
    "0018,9051": "Transmit Coil Type",
    "0018,9052": "Spectral Width",
    "0018,9053": "Chemical Shift Reference",
    "0018,9058": "MR Acquisition Frequency Encoding Steps",
    "0018,9059": "De-coupling",
    "0018,9064": "k-space Filtering",
    "0018,9073": "Acquisition Duration",
    "0018,9074": "Frame Acquisition DateTime",
    "0018,9075": "Diffusion Directionality",
    "0018,9087": "Diffusion b-value",
    "0018,9089": "Diffusion Gradient Orientation",
    "0018,9091": "Velocity Encoding Direction",
    "0018,9093": "Number of k-Space Trajectories",
    "0018,9100": "Resonant Nucleus",
    "0018,9170": "Respiratory Motion Compensation Technique",
    "0018,9174": "Applicable Safety Standard Agency",
    "0018,9175": "Applicable Safety Standard Description",
    "0018,9180": "Gradient Output Type",
    "0018,9182": "Gradient Output",
    "0018,9183": "Flow Compensation Direction",
    "0018,9184": "Tagging Delay",
    "0018,9185": "Respiratory Motion Compensation Technique Description",
    "0018,9197": "MR Velocity Encoding Sequence",
    "0018,9198": "First Order Phase Correction",
    "0018,9199": "Water Referenced Phase Correction",
    "0018,9200": "MR Spectroscopy Acquisition Type",
    "0018,9231": "MR Acquisition Phase Encoding Steps in-plane",
    "0018,9232": "MR Acquisition Phase Encoding Steps out-of-plane",
    "0018,9240": "RF Echo Train Length",
    "0018,9241": "Gradient Echo Train Length",
    "0020,000d": "Study Instance UID",
    "0020,000e": "Series Instance UID",
    "0020,0010": "Study ID",
    "0020,0011": "Series Number",
    "0020,0012": "Acquisition Number",
    "0020,0013": "Instance Number",
    "0020,0032": "Image Position (Patient)",
    "0020,0037": "Image Orientation (Patient)",
    "0020,0052": "Frame of Reference UID",
    "0020,0060": "Laterality",
    "0020,1002": "Images in Acquisition",
    "0020,1040": "Position Reference Indicator",
    "0020,1041": "Slice Location",
    "0020,1208": "Number of Study Related Instances",
    "0020,4000": "Image Comments",
    "0028,0006": "Planar Configuration",
    "0028,0008": "Number of Frames",
    "0028,0002": "Samples Per Pixel",
    "0028,0004": "Photometric Interpretation",
    "0028,0010": "Rows",
    "0028,0011": "Columns",
    "0028,0030": "Pixel Spacing",
    "0028,0100": "Bits Allocated",
    "0028,0101": "Bits Stored",
    "0028,0102": "High Bit",
    "0028,0103": "Pixel Representation",
    "0028,0106": "Smallest Image Pixel Value",
    "0028,0107": "Largest Image Pixel Value",
    "0028,0120": "Pixel Padding Value",
    "0028,1054": "Rescale Type",
    "0028,1050": "Window Center",
    "0028,1051": "Window Width",
    "0028,1052": "Rescale Intercept",
    "0028,1053": "Rescale Slope",
    "0028,2110": "Lossy Image Compression",
    "0028,2112": "Lossy Image Compression Ratio",
    "0032,1032": "Requesting Physician",
    "0032,1033": "Requesting Service",
    "0032,1060": "Requested Procedure Description",
    "0032,1064": "Requested Procedure Code Sequence",
    "0040,0001": "Scheduled Station AE Title",
    "0040,0002": "Scheduled Procedure Step Start Date",
    "0040,0003": "Scheduled Procedure Step Start Time",
    "0040,0006": "Scheduled Performing Physician's Name",
    "0040,0007": "Scheduled Procedure Step Description",
    "0040,0009": "Scheduled Procedure Step ID",
    "0040,0100": "Scheduled Procedure Step Sequence",
    "0040,0244": "Performed Procedure Step Start Date",
    "0040,0245": "Performed Procedure Step Start Time",
    "0040,0253": "Performed Procedure Step ID",
    "0040,0254": "Performed Procedure Step Description",
    "0040,0275": "Request Attributes Sequence",
    "0040,1001": "Requested Procedure ID",
    "0040,1002": "Reason for Requested Procedure",
    "0040,1003": "Requested Procedure Priority",
    "0040,1004": "Patient Transport Arrangements",
    "0040,1400": "Requested Procedure Comments",
    "0054,0081": "Number of Slices",
    "0054,0410": "Patient Orientation Code Sequence",
    "7fe0,0010": "Pixel Data"
  };

  const EXPLICIT_LONG_VR = new Set(["OB", "OD", "OF", "OL", "OW", "SQ", "UC", "UR", "UT", "UN"]);
  const TEXT_VR = new Set(["AE", "AS", "CS", "DA", "DS", "DT", "IS", "LO", "LT", "PN", "SH", "ST", "TM", "UC", "UI", "UR", "UT"]);
  const UINT16_VR = new Set(["US"]);
  const INT16_VR = new Set(["SS"]);
  const UINT32_VR = new Set(["UL"]);
  const INT32_VR = new Set(["SL"]);
  const FLOAT_VR = new Set(["FL"]);
  const DOUBLE_VR = new Set(["FD"]);

  function tagKey(group, element) {
    return `${group.toString(16).padStart(4, "0")},${element.toString(16).padStart(4, "0")}`;
  }

  function displayTagKey(key) {
    return `(${key})`;
  }

  function creatorName(group, element, privateCreators) {
    const groupKey = group.toString(16).padStart(4, "0");
    const block = (element >> 8) & 0xff;
    return privateCreators[groupKey]?.[block] || "";
  }

  function tagName(key, group, element, privateCreators = {}) {
    if (TAGS[key]) return TAGS[key];
    if (group % 2 === 1 && element >= 0x0010 && element <= 0x00ff) return "Private Creator";
    if (group % 2 === 1) {
      const creator = creatorName(group, element, privateCreators);
      return creator ? `Private tag - ${creator}` : "Private tag";
    }
    return `Unknown DICOM tag ${displayTagKey(key)}`;
  }

  function readString(view, offset, length) {
    const bytes = new Uint8Array(view.buffer, view.byteOffset + offset, length);
    return new TextDecoder("ascii").decode(bytes).replace(/\0/g, "").trim();
  }

  function numericValues(view, offset, length, vr) {
    const values = [];
    const little = true;
    if (UINT16_VR.has(vr) || INT16_VR.has(vr)) {
      for (let i = 0; i + 1 < length; i += 2) {
        values.push(UINT16_VR.has(vr) ? view.getUint16(offset + i, little) : view.getInt16(offset + i, little));
      }
    } else if (UINT32_VR.has(vr) || INT32_VR.has(vr)) {
      for (let i = 0; i + 3 < length; i += 4) {
        values.push(UINT32_VR.has(vr) ? view.getUint32(offset + i, little) : view.getInt32(offset + i, little));
      }
    } else if (FLOAT_VR.has(vr)) {
      for (let i = 0; i + 3 < length; i += 4) values.push(view.getFloat32(offset + i, little));
    } else if (DOUBLE_VR.has(vr)) {
      for (let i = 0; i + 7 < length; i += 8) values.push(view.getFloat64(offset + i, little));
    }
    return values.length === 1 ? values[0] : values;
  }

  function parseValue(view, offset, length, vr) {
    if (length === 0) return "";
    if (TEXT_VR.has(vr)) return readString(view, offset, length);
    const numberValue = numericValues(view, offset, length, vr);
    if (Array.isArray(numberValue) ? numberValue.length : numberValue !== undefined) return numberValue;
    if (length <= 32) return readString(view, offset, length);
    return `[${length} bytes]`;
  }

  function isExplicitTransferSyntax(uid) {
    if (!uid) return true;
    return uid !== "1.2.840.10008.1.2";
  }

  function isLittleEndianTransferSyntax(uid) {
    return uid !== "1.2.840.10008.1.2.2";
  }

  function isCompressedTransferSyntax(uid) {
    return Boolean(uid) && ![
      "1.2.840.10008.1.2",
      "1.2.840.10008.1.2.1",
      "1.2.840.10008.1.2.1.99",
      "1.2.840.10008.1.2.2"
    ].includes(uid);
  }

  function readElement(view, offset, explicitVr, littleEndian) {
    if (offset + 8 > view.byteLength) return null;
    const group = view.getUint16(offset, littleEndian);
    const element = view.getUint16(offset + 2, littleEndian);
    const key = tagKey(group, element);
    let vr = "UN";
    let length;
    let valueOffset;

    if (explicitVr) {
      vr = readString(view, offset + 4, 2);
      if (EXPLICIT_LONG_VR.has(vr)) {
        if (offset + 12 > view.byteLength) return null;
        length = view.getUint32(offset + 8, littleEndian);
        valueOffset = offset + 12;
      } else {
        length = view.getUint16(offset + 6, littleEndian);
        valueOffset = offset + 8;
      }
    } else {
      length = view.getUint32(offset + 4, littleEndian);
      valueOffset = offset + 8;
      vr = inferVr(key);
    }

    if (length === 0xffffffff) {
      return { key, group, element, vr, length, valueOffset, nextOffset: view.byteLength, value: "[undefined length]" };
    }

    const nextOffset = valueOffset + length + (length % 2);
    if (valueOffset + length > view.byteLength) return null;

    return {
      key,
      group,
      element,
      vr,
      length,
      valueOffset,
      nextOffset,
      value: key === "7fe0,0010" ? `[Pixel Data: ${length} bytes]` : parseValue(view, valueOffset, length, vr)
    };
  }

  function inferVr(key) {
    if (["0028,0010", "0028,0011", "0028,0100", "0028,0101", "0028,0102", "0028,0103", "0028,0002"].includes(key)) return "US";
    if (["0028,1050", "0028,1051", "0028,1052", "0028,1053"].includes(key)) return "DS";
    return "UN";
  }

  function parseDicom(arrayBuffer) {
    const view = new DataView(arrayBuffer);
    const warnings = [];
    let offset = 0;
    const hasPreamble = view.byteLength > 132 && readString(view, 128, 4) === "DICM";
    if (hasPreamble) {
      offset = 132;
    } else {
      warnings.push("Missing DICM preamble. Trying to parse from byte 0.");
    }

    const elements = {};
    const ordered = [];
    const privateCreators = {};
    let transferSyntax = "";
    let explicitVr = true;
    let littleEndian = true;

    while (offset + 8 <= view.byteLength) {
      const element = readElement(view, offset, explicitVr, littleEndian);
      if (!element || element.nextOffset <= offset) break;
      ordered.push(element);
      if (element.group % 2 === 1 && element.element >= 0x0010 && element.element <= 0x00ff) {
        const groupKey = element.group.toString(16).padStart(4, "0");
        const block = element.element & 0x00ff;
        privateCreators[groupKey] = privateCreators[groupKey] || {};
        privateCreators[groupKey][block] = String(element.value || "").trim();
      }
      elements[element.key] = {
        name: tagName(element.key, element.group, element.element, privateCreators),
        tag: element.key,
        displayTag: displayTagKey(element.key),
        vr: element.vr,
        length: element.length,
        value: element.value
      };
      if (element.key === "0002,0010") {
        transferSyntax = String(element.value || "").trim();
      }
      if (element.group === 0x0002 && transferSyntax) {
        explicitVr = true;
        littleEndian = true;
      } else if (transferSyntax) {
        explicitVr = isExplicitTransferSyntax(transferSyntax);
        littleEndian = isLittleEndianTransferSyntax(transferSyntax);
      }
      if (element.key === "7fe0,0010") break;
      offset = element.nextOffset;
    }

    const pixelElement = ordered.find((item) => item.key === "7fe0,0010");
    if (transferSyntax && isCompressedTransferSyntax(transferSyntax)) {
      warnings.push(`Compressed transfer syntax (${transferSyntax}) detected. Metadata is parsed, but image preview needs a codec.`);
    }
    if (!littleEndian) {
      warnings.push("Big endian DICOM detected. Metadata is parsed, but preview support is limited.");
    }

    return { elements, ordered, transferSyntax, pixelElement, warnings, privateCreators, buffer: arrayBuffer };
  }

  function firstNumber(value, fallback = 0) {
    if (Array.isArray(value)) return Number(value[0] || fallback);
    if (typeof value === "string") return Number(value.split("\\")[0] || fallback);
    return Number(value || fallback);
  }

  function renderToCanvas(parsed, canvas) {
    const elements = parsed.elements;
    const rows = firstNumber(elements["0028,0010"]?.value);
    const columns = firstNumber(elements["0028,0011"]?.value);
    const bitsAllocated = firstNumber(elements["0028,0100"]?.value);
    const samplesPerPixel = firstNumber(elements["0028,0002"]?.value, 1);
    const pixelRepresentation = firstNumber(elements["0028,0103"]?.value);
    const photometric = String(elements["0028,0004"]?.value || "MONOCHROME2");
    const pixelElement = parsed.pixelElement;

    if (!pixelElement) throw new Error("Pixel Data tag was not found.");
    if (!rows || !columns) throw new Error("Rows/Columns tags are missing.");
    if (samplesPerPixel !== 1) throw new Error("Only grayscale DICOM preview is supported in this lightweight extension.");
    if (![8, 16].includes(bitsAllocated)) throw new Error(`Unsupported Bits Allocated: ${bitsAllocated}.`);
    if (isCompressedTransferSyntax(parsed.transferSyntax)) throw new Error("Compressed pixel data cannot be rendered by this lightweight extension.");

    const count = rows * columns;
    const pixelOffset = pixelElement.valueOffset;
    const values = new Float32Array(count);
    const view = new DataView(parsed.buffer);
    let min = Infinity;
    let max = -Infinity;

    for (let i = 0; i < count; i += 1) {
      let value;
      if (bitsAllocated === 8) {
        value = pixelRepresentation ? view.getInt8(pixelOffset + i) : view.getUint8(pixelOffset + i);
      } else {
        const byteOffset = pixelOffset + i * 2;
        value = pixelRepresentation ? view.getInt16(byteOffset, true) : view.getUint16(byteOffset, true);
      }
      values[i] = value;
      if (value < min) min = value;
      if (value > max) max = value;
    }

    const windowCenter = firstNumber(elements["0028,1050"]?.value, (min + max) / 2);
    const windowWidth = firstNumber(elements["0028,1051"]?.value, max - min || 1);
    const low = windowCenter - windowWidth / 2;
    const high = windowCenter + windowWidth / 2;

    canvas.width = columns;
    canvas.height = rows;
    const context = canvas.getContext("2d");
    const imageData = context.createImageData(columns, rows);

    for (let i = 0; i < count; i += 1) {
      let gray = Math.round(((values[i] - low) / Math.max(1, high - low)) * 255);
      gray = Math.max(0, Math.min(255, gray));
      if (photometric === "MONOCHROME1") gray = 255 - gray;
      const target = i * 4;
      imageData.data[target] = gray;
      imageData.data[target + 1] = gray;
      imageData.data[target + 2] = gray;
      imageData.data[target + 3] = 255;
    }

    context.putImageData(imageData, 0, 0);
    return { rows, columns, bitsAllocated, min, max, windowCenter, windowWidth };
  }

  window.DicomQuickReader = { parseDicom, renderToCanvas, displayTagKey };
})();
