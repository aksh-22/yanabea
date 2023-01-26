interface originItemType {
  y?: string;
  x?: string;
}

interface boundsType {
  width?: number;
  height?: number;
  origin?: Array<originItemType>;
}

interface qrCodeScanDataType {
  bounds?: boundsType;
  type?: string;
  rawData?: string;
  data?: string;
  target?: number;
}
