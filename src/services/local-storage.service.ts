

class LocalStorageService{

    public getItem = (key:string): object | null =>{
        try{
            return JSON.parse(localStorage.getItem(key) || '');
        }catch(e){
            return null;
        }

    }

    public setItem = (key:string, data:any):void => {
        data = JSON.stringify(data);
        localStorage.setItem(key, data);
    }
}

export default new LocalStorageService();