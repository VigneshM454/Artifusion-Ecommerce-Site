const data={
    name:'john doe',
    age:30,
    address:'123 main street'
};

$.ajax({
    url:'/process',
    type:'GET',
    contnetType:'application/json',
    data:JSON.stringify(data),
    success:alert('success'),
    error:alert(error)
})