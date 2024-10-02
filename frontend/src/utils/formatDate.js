const formatDate = (dateString) => {
    const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
};



export default formatDate;
