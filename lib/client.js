const Core = require('@alicloud/pop-core')

const ENDPOINT = 'https://slb.aliyuncs.com'
const API_VER = '2014-05-15'

const actionMap = {
  fetchLoadBalancers: 'DescribeLoadBalancers',
  fetchLoadBalancer: 'DescribeLoadBalancerAttribute',
  fetchHTTPSListener: 'DescribeLoadBalancerHTTPSListenerAttribute',
  fetchServerCert: 'DescribeServerCertificates',
  fetchExtraDomains: 'DescribeDomainExtensions',
  uploadServerCert: 'UploadServerCertificate',
  deleteServerCert: 'DeleteServerCertificate',
  updateHTTPSListener: 'SetLoadBalancerHTTPSListenerAttribute',
  updateExtraDomain: 'SetDomainExtensionAttribute'
}

class Client {
  constructor(conf) {
    const { ACCESS_KEY, ACCESS_SECRET, REGION = 'cn-hangzhou' } = conf

    this._client = new Core({
      accessKeyId: ACCESS_KEY,
      accessKeySecret: ACCESS_SECRET,
      endpoint: ENDPOINT,
      apiVersion: API_VER
    })

    this.actions = actionMap
    this.defaultParams = {
      RegionId: REGION
    }
    this.defaultRequestOption = {
      method: 'POST'
    }
  }

  createRequest(actionName) {
    return async (params, options) => {
      const result = await this._client.request(
        actionName,
        { ...this.defaultParams, ...params },
        { ...this.defaultRequestOption, ...options }
      )
      return result
    }
  }
}

exports.createClient = (conf) => {
  const client = new Client(conf)
  const methods = {}

  Object.keys(actionMap).forEach((action) => {
    methods[action] = client.createRequest(actionMap[action])
  })

  return methods
}
