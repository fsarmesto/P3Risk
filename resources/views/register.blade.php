<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    @vite(['resources/css/register.css', 'resources/js/register.js'])
</head>
<body>
    <h1>Log in to RISK</h1>
    <main>
        <form>
            <div class="userInfo">
                <input name="uName" id="uName" type="text" placeholder="Username..."/><br>
                <input name="pWord" id="pWord" type="password" placeholder="Password..."/>
                <input name="pWord2" id="pWord2" type="password" placeholder="Repeat your password..."/>
            </div>
            <button id="sub-but" type="submit">Log In</button>
            <div id="errorMessages">
            </div>
        </form>
    </main>
</body>
</html>