import { SettingDrawer } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';
import { currentUser as queryCurrentUser } from './services/userService';
import defaultSettings from '../config/defaultSettings';
import { message } from 'antd';
const loginPath = '/user/login';
/** 获取用户信息比较慢的时候会展示一个 loading */

export const initialStateConfig = {
  loading: <PageLoading />,
};
/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */

export async function getInitialState() {
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser();
      return msg.data;
    } catch (error) {
      sessionStorage.setItem(window.location.hostname, '');
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，要有token才执行
  if (history.location.pathname == loginPath) {
    if (sessionStorage.getItem(window.location.hostname)) {
      const currentUser = await fetchUserInfo();
      return {
        fetchUserInfo,
        currentUser,
        settings: defaultSettings,
      };
    }
  }
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
} // ProLayout 支持的api https://procomponents.ant.design/components/layout

//请求拦截器
const authHeaderInterceptor = (url, options) => {
  if (sessionStorage.getItem(window.location.hostname)) {
    const authHeader = {
      Authorization: `Bearer ${sessionStorage.getItem(window.location.hostname)}`,
    };
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: authHeader },
    };
  }
  return {
    url: `${url}`,
    options: { ...options, interceptors: true },
  };
};

// 响应拦截器
const tokenResponseInterceptors = async (response, options) => {
  const res = await response.clone().json();
  const errMsg = res.msg || '请求失败';
  if (res.code !== 0) {
    message.error(errMsg);
  } else {
    console.log('success');
  }
  return response;
};

export const request = {
  requestInterceptors: [authHeaderInterceptor],
  responseInterceptors: [tokenResponseInterceptors],
};

export const layout = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    footerRender: () => <Footer />,
    onPageChange: () => {
      const { location } = history; // 如果没有登录，重定向到 login

      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }

      const hasToken = sessionStorage.getItem(window.location.hostname);
      if (hasToken) {
        if (location.pathname == loginPath) {
          history.push('/');
        }
      }
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      // if (initialState?.loading) return <PageLoading />;
      return (
        <>
          {children}
          {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({ ...preInitialState, settings }));
              }}
            />
          )}
        </>
      );
    },
    menu: {
      params: initialState,
      request: async (params, defaultMenuData) => {
        return initialState?.currentUser?.menuData || [];
      },
    },
    ...initialState?.settings,
  };
};
