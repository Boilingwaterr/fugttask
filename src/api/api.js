export const api = {
    getSmallData: async () => {
        return fetch('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then(res => res.json())
            .catch(e => {
                return new Error('Something went wrong. Pleae try again later.')
            })
    },
    getBigData: () => {
        return fetch('http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}')
            .then(res => res.json())
            .catch(e => {
                return new Error('Something went wrong. Pleae try again later.')
            })
    }
}