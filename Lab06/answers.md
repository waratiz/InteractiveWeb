1. In one sentence: What does res.render(view, data) do?
tells the server to generate HTML from the given view and data, and send it as an HTTP response to the client.

2. What is the difference between <%= %> and <%- %>?
<%= %> outputs the value as a string with HTML
<%- %>? It outputs raw HTML value

3. Where does Express look for EJS templates (folder path)?
Express looks for EJS templates in the views folder at the root of the project