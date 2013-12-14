/*
postRequest() - post a form by javascript non ajax

usage: postRequest( 'example.com', { 'foo' : '123', 'bar' : 'abc' } );
  will submit a form such as:
    <form action="example.com" method="POST">
        <input name="foo" value="123" />
        <input name="bar" value="abc" />
    </form>

*/

function postRequest( url, data ) {
    var form = document.createElement('form'), input;
    form.action = url;
    form.method = 'POST';
    for(var k in data) {
        if(data.hasOwnProperty(k)){
            input = document.createElement('input');
            input.type = 'hidden';
            input.name = k;
            input.value = data[k];
            form.appendChild(input);
        }
    }
    document.body.appendChild(form);
    form.submit();   
}
