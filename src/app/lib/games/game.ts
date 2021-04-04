
export abstract class Game {

    constructor(
        private title?: string, 
        private player?: string, 
        public won?: boolean
    ) {
        this.title = title ?? 'Untiled';
        this.player = player ?? "Jhon Doe";
        this.won = won ?? false;
    }
    
    public abstract validate(answer?:any): boolean;

    public help() {
        return "undefined";
    }
}