import { useRef } from "react";

export async function loader() {
    const [auth, res] = await Promise.all([
        fetch('http://localhost:8080/admin/credential', {method : 'POST', credentials : 'include'}),
        fetch('http://localhost:8080/player/all')
    ])

    const authData = await auth.json();
    const resData = await res.json();

    return {
        authData,
        resData
    };

}

export function useFirstLoad() {
    const isFirstLoad = useRef(true);
  
    function shouldRevalidate() {
      if (isFirstLoad.current) {
        isFirstLoad.current = false;
        return true;  // 첫 로딩 시에만 허용
      }
      return false;   // 이후 모든 로딩 차단
    }
  
    return shouldRevalidate;
  }