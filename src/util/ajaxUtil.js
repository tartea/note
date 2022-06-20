import axios from 'axios';

export function mock(url, method = 'get') {
  const service = axios.create({
    baseURL: 'http://localhost:8080', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });
  const prefixUrl = '../static/mock' //设置本地请求的前缀

  return service({url: prefixUrl + url, method: method})
}

export function request(url, method = 'get') {
  const service = axios.create({
    baseURL: 'http://localhost:7777', // 设置统一的请求前缀
    timeout: 10000, // 设置统一的超时时长
  });

  return service({url: url, method: method})
}
