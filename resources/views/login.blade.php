<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    @vite(['resources/css/login.css', 'resources/js/login.js'])
</head>
<body>
    <h1>Log in to RISK</h1>
    <main>
        <form>
            <div class="userInfo">
                <input name="uName" id="uName" type="text" placeholder="Username..."/>
                <input name="pWord" id="pWord" type="password" placeholder="Password..."/>
            </div>
            <button id="sub-but" type="submit">Log In</button>
            <div id="errorMessages">
            </div>
        </form>
        <a href="/register">Not a member yet? Register here!</a>
    </main>
</body>
</html>