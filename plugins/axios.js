export default function({ $axios, redirect }) {
    $axios.setBaseURL(`https://${process.env.BACKEND_SERVER}:${process.env.BACKEND_PORT}`);
    $axios.setToken(process.env.REDMINE_APIKEY, 'Bearer');
    $axios.onRequest(config => {
        console.log('Peticion a ' + config.url)
    })

    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        if (code === 400) {
            redirect('/error')
        }
    })
}


