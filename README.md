# Aliyun SLB Ssl-Cert Renewal

## Run

```bash
  ACCESS_KEY=your_aliyun_access_key \
  ACCESS_SECRET=your_aliyun_access_secret \
  REGION=your_aliyun_access_region \
  npx aliyun-slb-cert-renew \
    --lb=target-loadbalance-id \
    --key=path/to/privatekeyfile \
    --cert=path/to/chaincertfile
```