class L {
    /**
     * 
     * @param from de donde pedimos la instancia
     */

    from: String;
    levels: any = ["log", "info", "err"]
    constructor(from: String) {
        this.from = from

    }

    Log(level: number, message: any) {
        console.log(`${this.from}::${this.levels[level]}::`, message);
    }
}

export { L };