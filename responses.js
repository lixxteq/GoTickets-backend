const status = (code, values, res) => {
    const data = {
        'status': code,
        'values': values
    }
    res.json(data)
    res.end()
}

const response = {
    status
}

export default response;