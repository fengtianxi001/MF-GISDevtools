class Local {
  setItem(table: string, data: any) {
    window.localStorage.setItem(table, JSON.stringify(data));
  }
  getItem(table: string) {
    const data = window.localStorage.getItem(table);
    let result;
    try {
      result = JSON.parse(data);
    } catch (error) {
      result = null;
    }
    return result;
  }
}
