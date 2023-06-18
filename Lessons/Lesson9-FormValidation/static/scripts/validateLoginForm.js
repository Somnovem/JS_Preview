(()=>{
    var loginForm = document.querySelector('#loginForm');
    loginForm.querySelector('#create_account_btn').addEventListener('click',()=>{
        var validator = new Validator(loginForm.querySelector('#email_address').value);
        var errorLabel = loginForm.querySelector('#label_info');
        
        validator.MaxLength(64).MinLength(9).IsEmail();

        if(validator.GetErrors().length > 0){
            errorLabel.innerHTML = validator.GetError(0);
            return;
        }

        validator.Validate(loginForm.querySelector('#password').value).MinLength(8).MaxLength(16).CheckPasswordComplexity();

        if(validator.GetErrors().length > 0){
            errorLabel.innerHTML = validator.GetError(0);
            return;
        }

        loginForm.submit();
    });
})()