# Codeial-App
CRUD app (nodejs) emabled with passport authentication. DB = Mongodb

Web App created having :
1. user sign up
2. user login/signout
3. submission of post on browser + db
4. Comments section below a particular post added , sync with db.


    <!-- form for comments -->

                        <!-- <div class = "post-comments"> -->

                                <!-- showing posts to singed in user only after - Authentication (locals = object) --> 
                                <% if(locals.user) { %>

                                <form action="/comments/create" method="post">

                                        <input type="text" name="content" placeholder="Type here to add comment...." required>

                                        <!-- value below will be the id of the post -->
                                        <input type="hidden" name="post" value="<%= post._id %>" >

                                        <input type="submit" value="Add Comment">

                                </form>        
                        <% } %>

                        <div class="post-comments-list">
                                <ul id="post-comments-<%= post._id %>">
                                        <% for (comment of post.comments) { %> 
                                                 <p>
                                                        <%= comment.content %>
                                                        <br>
                                                        <small>
                                                                <%= comment.user.name %>
                                                        </small>
                                                </p>


                                         <% } %>

                                </ul>


                        </div>
 