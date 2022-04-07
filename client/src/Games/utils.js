const today = () => new Date().toISOString().slice(0, 10)

const tomorrow = () => {

    const tday = new Date();
    const tomorrow = new Date(tday);
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    return tomorrow.toISOString().slice(0, 10);
}