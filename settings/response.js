const send = (status, values, res) => {
    const data = {
        'status': status,
        'values': values
    };
    res.json(data);
    res.end();
};

const response = {
    send
};

export default response;