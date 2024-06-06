const axiosRequest = require("../utils/axios-request");
const { decodeProtobuf } = require("../utils/decodeProtobuf");

const requestLiveOps = async (opts) => {
  const requestOptions = Object.assign({
    method: 'get',
    url: `https://play-fe.googleapis.com/fdfe/apps/detailsLiveOpsStream?doc=${opts.appId}&ps=1`,
    responseType: "arraybuffer",
    headers: {
      'Accept-Language': opts.lang,
      'X-DFE-Device-Id': opts.auth.deviceId,
      Authorization: `Bearer ${opts.auth.token}`,
      'X-PS-RH':
        'H4sIAAAAAAAAAONqZuRqYPQwKfZ0hIJ4U99KkwpPI7-iZAO_LMeKkhDHcl8X13K_kMDK4pDACrconzzXLEcD3yrfCr-QUAO_KscqP5fIKqCaYJPSxEi_VGP_EJdEJ-fwslT_iiyv5DS3CosIx2Inx5Lk3IBCk5wwV8-MwGRHM1dXP8uwdJCVtgA31_UfhgAAAA',
      'User-Agent':
        'Android-Finsky/30.3.21-21%20%5B0%5D%20%5BPR%5D%20445437866 (api=3,versionCode=83032110,sdk=21,device=generic_x86_64,hardware=ranchu,product=sdk_phone_x86_64,platformVersionRelease=5.0.2,model=Android%20SDK%20built%20for%20x86_64,buildId=LSY66K,isWideScreen=0,supportedAbis=x86_64;x86)',
      'X-DFE-Cookie': 'EAEYACICQlJKEgoCQlISDAiY6u-aBhDIxeaeA1gA',
      'X-Limit-Ad-Tracking-Enabled': 'false',
      'X-DFE-Network-Type': '3',
      'X-DFE-MCCMNC': '310260',
      'X-DFE-Client-Id': 'am-unknown',
      'X-DFE-Encoded-Targets':
        'CAEagwFXjAUF0I+BBgnEAgQCDecBfS+6AVYBIQojDSI3hAEODGMJWKoBE4wCFExZAQEUWxniBQSSAjycAqcHpARZvQaSCuAF4B+uHO4G5AebGgIBkAXKCe0K9werAuMJgwO8AssBFuoYuiafP4MGRVYBjgXUAq4R6RqIDvYL9wKbA8c7n4SNEg',
      'X-DFE-Request-Params': 'timeoutMs=4000',
      'X-Ad-Id': '17fede2f-b8ca-4a2b-b8df-bde14eceb94e',
      Host: 'play-fe.googleapis.com',
      Connection: 'Keep-Alive',
      'Accept-Encoding': 'gzip, deflate',
    }
  }, opts.requestOptions);

  const data = await axiosRequest(requestOptions);
  return decodeProtobuf(data, 'string');
};

module.exports = { requestLiveOps };