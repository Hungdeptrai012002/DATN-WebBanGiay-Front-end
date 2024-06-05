import { orderContant } from './contant';
export const isJsonString = (data) => {
    try {
        JSON.parse(data);
    } catch (error) {
        return false;
    }
    return true;
};

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const renderOptions = (arr) => {
    let results = [];
    if (arr) {
        results = arr.map((opt) => ({
            value: opt,
            label: opt,
        }));
    }
    results.push({
        label: 'Thêm type',
        value: 'add_type',
    });
    return results;
};

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString().replaceAll(',', '.');
        return `${result} VND`;
    } catch (error) {
        return null;
    }
};

export const initFacebookSDK = () => {
    if (window.FB) {
        window.FB.XFBML.parse();
    }

    const locale = "vi_VN";

    window.fbAsyncInit = function () {
        window.FB.init({
            appId: '2540305012828074',
            cookie: true,
            xfbml: true,
            version: 'v8.6',
        });
    };

    (function (d, s, id) {
        let js,
            fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = `//connect.facebook.net/${locale}/sdk.js`;
        fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
};

export const convertDataChart = (data, type) => {
    try{
        const object = {};
        Array.isArray(data) && data?.forEach((opt) => {
            if (!object[opt[type]]) {
                object[opt[type]] = 1;
            } else {
                object[opt[type]] += 1;
            }
        });
       const results = Array.isArray(Object.keys(object)) && Object.keys(object).map((item) => {
        return{
            name: orderContant.payment[item],
            value:object[item]
        }
       })
       return results
    }catch(e){
        return []
    }
};
