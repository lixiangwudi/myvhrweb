import {getRequest} from "./api";

export const initMenu = (router,store)=>{
  if(store.state.routers.length > 0){
    return;
  }
  getRequest("/system/config/menu").then(data =>{
    if(data){
      let fmtRouters = formatRouters(data);
      router.addRoutes(fmtRouters);
      store.commit('initRoutes',fmtRouters)
    }
  })
}

export const formatRouters=(routers)=>{
  let fmRoutes = [];
  routers.forEach(router =>{
      let {
        path,component,name,meta,iconcls,children
      } = router;
      if(children && children instanceof Array){
        children = formatRouters(children);
      }
      let fmRoute={
        path:path,
        name:name,
        iconcls:iconcls,
        meta:meta,
        children:children,
        component(resolve){if(component.startsWith("Home")){
          require(['../pages/'+component+'.vue'],resolve)
          }else if(component.startsWith("Emp")){
            require(['../pages/emp/'+component+'.vue'],resolve)
          }else if(component.startsWith("Per")){
            require(['../pages/per/'+component+'.vue'],resolve)
          }else if(component.startsWith("Sal")){
            require(['../pages/sal/'+component+'.vue'],resolve)
          }else if(component.startsWith("Sta")){
            require(['../pages/sta/'+component+'.vue'],resolve)
          }else if(component.startsWith("Sys")){
            require(['../pages/sys/'+component+'.vue'],resolve)
          }

        }
      }
      fmRoutes.push(fmRoute)
    }
  )
  return fmRoutes;
}
