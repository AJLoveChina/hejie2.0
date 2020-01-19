var a = "a",
    b = "b",
    c = "c";


function hannoi (n, from, buffer, to)
{
    if (n == 1)
    {
        console.log("Move disk " + n + " from " + from + " to " + to);

    }
    else
    {
        hannoi (n-1, from, to, buffer);
        console.log("Move disk " + n + " from " + from + " to " + to);
        hannoi (n-1, buffer, from, to);
    }
}

hannoi(10, a, b, c);


function h(n, a, b, c){
    if (n === 1) {
        console.log("Move " + n + " from " + a + " to " + c);
    } else {
        h(n -1, a, c, b);
        console.log("Move " + n + " from " + a + " to " + c);
        h(n-1, b, a, c);
    }
}
h(10, "a", "b", "c")
