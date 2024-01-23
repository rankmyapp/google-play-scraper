/* eslint-disable no-case-declarations */
const protobufjs = require('protobufjs');

function decodeProtobuf(buffer, stringMode = 'auto') {
  const { Reader } = protobufjs;

  const reader = Reader.create(buffer);
  const out = [];
  while (reader.pos < reader.len) {
    const tag = reader.uint64();
    const id = tag >>> 3;
    const wireType = tag & 7;
    switch (wireType) {
      case 0:
        out.push({ [id]: reader.uint32() });
        break;
      case 1:
        out.push({ [id]: reader.fixed64() });
        break;
      case 2:
        const bytes = reader.bytes();
        try {
          const innerMessage = decodeProtobuf(bytes, stringMode);
          out.push({ [id]: innerMessage });
        } catch (e) {
          if (stringMode === 'binary') {
            out.push({ [id]: bytes });
          } else if (stringMode === 'string') {
            out.push({ [id]: bytes.toString() });
          } else {
            let hasExtended = false;
            bytes.forEach((b) => {
              if (b < 32) {
                hasExtended = true;
              }
            });
            if (hasExtended) {
              out.push({ [id]: bytes });
            } else {
              out.push({ [id]: bytes.toString() });
            }
          }
        }
        break;
      case 5:
        out.push({ [id]: reader.float() });
        break;
      default:
        reader.skipType(wireType);
    }
  }

  return out;
}

module.exports = { decodeProtobuf };