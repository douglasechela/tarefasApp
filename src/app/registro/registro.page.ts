import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CpfValidator } from '../validators/cpfvalidators';
import { ComparacaoValidator } from '../validators/comparacao-validators';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public formRegistro: FormGroup;

  public mensagens_validacao = {
    nome: [
      {tipo: 'required', mensagem: 'O campo nome é obrigatório!'},
      {tipo: 'minLength', mensagem: 'O nome precisa ter pelo menos 3 caracteres!'}
    ],
    cpf: [
      {tipo: 'required', mensagem: 'O campo CPF é obrigatório!'},
      {tipo: 'minLength', mensagem: 'O CPF pecisa ter pelo menos 11 caracteres!'},
      {tipo: 'maxLength', mensagem: 'O CPF só pode ter no máximo 14 caracteres!'},
      {tipo: 'invalido', mensagem: 'CPF inválido!'}
    ],
    dataNascimento: [
      {tipo: 'required', mensagem: 'O campo Data de Nascimento é obrigatório!'},
    ],
    genero: [
      {tipo: 'required', mensagem: 'O campo Gênero é obrigatório!'},
    ],
     celular: [
      {tipo: 'required', mensagem: 'O campo celular é obrigatório!'},
      {tipo: 'maxLength', mensagem: 'O número do celular pode ter no máximo 16 caracteres!'}
    ],
    email: [
      {tipo: 'required', mensagem: 'O campo E-mail é obrigatório!'},
    ],
    senha: [
      {tipo: 'required', mensagem: 'O campo senha é obrigatório!'},
      {tipo: 'minLength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'}
    ],
    confirmarsenha: [
      {tipo: 'required', mensagem: 'O campo senha é obrigatório!'},
      {tipo: 'minLength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'},
      {tipo: 'comparacao', mensagem: 'Deve ser igual a Senha!'}
    ]
  };

  constructor(private formBuilder: FormBuilder, private router: Router) { 
    this.formRegistro = formBuilder.group({
      nome: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cpf: ['', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfValidator.cpfValido ])],
      dataNascimento: ['', Validators.compose([Validators.required])],
      genero: ['', Validators.compose([Validators.required])],
      celular: ['', Validators.compose([Validators.required, Validators.maxLength(16)])],
      email: ['', Validators.compose([Validators.required])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmarsenha: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {
      validators: ComparacaoValidator('senha', 'confirmarsenha')
    });
  }

  ngOnInit() {
  }

  public registro(){
    if(this.formRegistro.valid){
      console.log('Formulário válido!');
      this.router.navigateByUrl('/home');
    } else{
      console.log('Formulário inválido!')
    }
  }

}
