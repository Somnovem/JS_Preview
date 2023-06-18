(()=>{
    var regForm = document.querySelector('#regForm');
    regForm.querySelector('#reg_create_account_btn').addEventListener('click',()=>{
        var validator = new Validator(regForm.querySelector('#reg_email_address').value);
        var errorLabel = regForm.querySelector('#reg_label_info');
        
        validator.MaxLength(64).MinLength(9).IsEmail();

        if(validator.GetErrors().length > 0){
            errorLabel.innerHTML = validator.GetError(0);
            return;
        }

        console.log(regForm.querySelector('#reg_password').value);
        console.log(regForm.querySelector('#reg_confirm_password').value);
        if(regForm.querySelector('#reg_password').value != regForm.querySelector('#reg_confirm_password').value){
            errorLabel.innerHTML = 'Passwords don\'t match';
            return;
        }

        validator.Validate(regForm.querySelector('#reg_password').value).MinLength(8).MaxLength(16).CheckPasswordComplexity();

        if(validator.GetErrors().length > 0){
            errorLabel.innerHTML = validator.GetError(0);
            return;
        }

        validator.Validate(regForm.querySelector('#reg_login').value).MinLength(8).MaxLength(20).ContainsInvalidSimpleLetters();

        if(validator.GetErrors().length > 0){
            errorLabel.innerHTML = validator.GetError(0);
            return;
        }

        validator.Validate(regForm.querySelector('#reg_phone').value).IsValidPhoneNumber();

        if(validator.GetErrors().length > 0){
            errorLabel.innerHTML = validator.GetError(0);
            return;
        }

        regForm.submit();
    });
})()