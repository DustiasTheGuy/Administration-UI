export class Config {
    private prod: boolean = false;
    private prefix: string;

    constructor(prefix?: string) {
        this.prefix = prefix || ''
    }

    public serverAddr(): string {
        return !this.prod ? 
        'http://localhost:8084' + this.prefix : 
        'https://admin.isakgranqvist.com' + this.prefix;
    }

    public getHeaders(contentType?: any): Object {
        return {
          headers: { 
            'authorization': localStorage.getItem('token') || '',
          }
        }
    }
}