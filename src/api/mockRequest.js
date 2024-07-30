import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

//创建axios实例
const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000,
})

//请求拦截器
requests.interceptors.request.use(
  (config) => {
    // console.log(config)
    //config 中 headers 属性最关键
    nprogress.start()
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

//响应拦截器
requests.interceptors.response.use(
  (response) => {
    // console.log(response)
    nprogress.done()
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default requests