
# Trabalho Final


Justificativa das escolhas das tecnologias para elaboração do trabalho final - Programação Web I 

## Tecnologias

 - SpringBoot 
 - JPA Hibernate
 - PostgresSQL
 - NodeJs
 - SASS 
 - GULP

BackEnd

	Para o backEnd da aplicação foi escolhido, em consenso da equipe, a utilização do SpringBoot com JPA Hibernate para implementação da Api REST que será consumida pelo front, utilizaremos o framework Hibernate para mapeamento das tabelas, controle e persistência de dados no bd que será construído em PostgreSQL.
 	Estas escolhas foram baseadas nos benefícios que desenvolver uma aplicação em SpringBoot provem, como a simplificação da escrita de código, configuração do ambiente de deploy, uma vez que o apache tomcat é embeded na aplicação, não sendo necessária configuração externa de um servidor web para utilização da aplicação. A escolha do PostgreSQL se dá pelo fato de ser uma tecnologia gratuita. Vale salientar que as escolhas também foram pautadas na experiência e familiaridade dos membros da equipe com essas tecnologias. 
  
FrontEnd 

	Para o frontEnd foram escolhidas as tecnologias NodeJS e o  SASS - Gulp. O NodeJS foi escolhido, pela flexibilidade e leveza. 
	Flexibilidade -O NPM (Node Package Manager) é o gerenciador de pacotes do Node.js e também é o maior repositório de softwares do mundo. Isso faz do Node.js uma plataforma com potencial para ser utilizada em qualquer situação. 
	Leveza - Criar um ambiente Node.js e subir uma aplicação é uma tarefa que não exige muitos recursos computacionais em comparação com outras tecnologias mais tradicionais.

	Tanto sua leveza quanto flexibilidade fazem do Node.JS uma tecnologia indicada para a implementação de serviços e componentes de arquiteturas como a de microsserviços e serverless.
	O SASS é uma linguagem de estilos baseada no CSS. Com ele podemos criar variáveis e reutilizar trechos de códigos com uma sintaxe simples. Porém os navegadores lêem apenas arquivos CSS, então é necessário compilar nosso SASS em CSS. É neste momento que entra o Gulp. Esse, é um automatizador de tarefas que ajuda no desenvolvimento nas tarefas dolorosas ou demoradas durante o trabalho de desenvolvimento dos projetos. Ele possui uma variedade imensa de módulos que fazem o que você quiser. E ainda fornece uma superfície API mínima, onde é fácil de aprender e simples de usar. Além das justificativas acima,também, contamos com a experiência e familiaridade dos membros da equipe com tais tecnologias.
  

  
## Equipe

- 414783 - JEFTE OLIVEIRA MARTINS 
- 387382 - MARIA BRUNA RIBEIRO OLIVEIRA 
- 408867 - NICHOLAS TRECE ESCOSSIO 
- 396061 - RICARDO RODRIGUES PEREIRA 

## Passos
Para utilizar as tecnologias desse projeto no front faça os seguintes passos
- cd front
- npm install
- npm install -g gulp.
- Para startar o projeto de gulp e uma aba vai abrir com o projeto rodando

Para utilizar as tecnologia desse projeto no back faça os seguintes passos

- cd ecommerce
- mvn install package
- cd target
- java -jar .\ecommerce-0.0.1-SNAPSHOT.jar
- O back encontra-se na seguinte pagina: http://localhost:8181/swagger-ui.html#/
