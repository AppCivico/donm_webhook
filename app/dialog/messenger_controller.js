'use strict';

//const config = require('../config');
const request = require('request');
const HashMap = require('hashmap');
const MS = require('./messenger_actions');
const api_ai = require('./api.ai_actions');
const api_cont = require('./apiAi_controller');
const payloads = require('../const/constants_payload');
const urls = require('../const/constants_url');
const cities = require('../const/cities');
const theme = require('../const/theme');
const net = require('./net');
const User = require('../server/controllers/user');
const ResMS = require('./responseMessenger');

var mCurrent = new HashMap();


module.exports = {

	//Lógica no recebimento de uma mensagem de texto....
	processMessageReceived(event) {

		console.log('messenger_controller.processMessageReceived - message');

        var senderId = event.sender.id;
        var recipientId = event.recipient.id;
        var message = event.message;
        var messageId = message.mid;
        var messageText = message.text;
        var attachments = message.attachments;
        var quickReply = message.quick_reply;


	    api_ai.sendApiAi(senderId, messageText, 'botcube_co');

	},

    // ** CLICK QUICK_REPLY OR PAYLOAD (Resposta rápida ou botão) **
    processQuickReplyOrPayload(senderId, payload, postback, event) {

        console.log('@@ messenger_controller.processQuickReplyMessage - QuickReply!');
        console.log(payload);

        switch(payload) {

            //** INICIO **//
            //Menu inicial (clicou no botão start)
            case payloads.PBK_START:
                console.log("## PBK_START -> olá "); //OK
                //Criando menu persistente
                MS.fluxo_2_Persistent_menu();
                //Capturando dados do usuário
                net.solicitationFacebookUserInfo(senderId, callback);
                //enviano mensagem para API.AI interpretar
                api_ai.sendApiAi(senderId, 'Olá', 'botcube_co');
                break;

            //Fluxo inicial -> Vamos começar?
            case payloads.PBK_INIT_DIALOGS:     
                console.log("## PBK_INIT_DIALOGS -> Vamos começar?"); // OK           
                api_ai.sendApiAi(senderId, 'Vamos começar?', 'botcube_co');
                break;
            //Reinicia o dialogo, apresentando as primeiras opções de dialogo
            case payloads.PBK_RESTART_DIALOGS:
                console.log("## PBK_RESTART_DIALOGS -> reiniciar o diálogo"); //OK
                ResMS.restartDialogs(senderId);
                break;



            //** SOBRE A LEI DE METAS **//
            //Fluxo "Conhecer a lei de metas" -> "O que é lei de metas"
            case payloads.PBK_KNOW:          
                console.log("## PBK_KNOW -> Como funciona a Lei e Metas?");  // OK     
                api_ai.sendApiAi(senderId, 'Como funciona a Lei e Metas?', 'botcube_co');
                break;

            //Fluxo "Conhecer a lei de metas" -> "Obrigações"
            case payloads.PBK_OBLIGATION_INFO:
                console.log("## PBK_OBLIGATION_INFO -> Quais as obrigações da prefeitura? "); //OK
                api_ai.sendApiAi(senderId, 'Quais as obrigações da prefeitura?', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas" -> "Obrigações" -> Plano deve conter
            case payloads.PBK_AUDIENCES_INFO:
                console.log("## PBK_AUDIENCES_INFO -> Audiências públicas "); //OK
                api_ai.sendApiAi(senderId, 'Audiências públicas', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas" -> "Obrigações" -> "O que deve conter?"
            case payloads.PBK_SHOULD_CONTAIN:
                console.log("## PBK_SHOULD_CONTAIN -> O que o plano de metas deve conter?"); //OK
                api_ai.sendApiAi(senderId, 'O que o plano de metas deve conter?', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas" -> "Obrigações" -> "Como acompanhar"
            case payloads.PBK_ACCOUNTABILITY:
                console.log("## PBK_ACCOUNTABILITY -> Como acompanhar o Plano de Metas?"); //OK
                api_ai.sendApiAi(senderId, 'Como acompanhar o Plano de Metas?', 'botcube_co');
                break;

                //Fluxo "Conhecer a lei de metas" -> "Participação popular 2017"
            case payloads.PBK_POPULAR_PARTICIPATION_INFO:
                console.log("## PBK_POPULAR_PARTICIPATION_INFO -> Como foi a participação popular na Gestão 2017?"); //OK
                api_ai.sendApiAi(senderId, 'Como foi a participação popular na Gestão 2017?', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas"  -> Participação popular -> Onde
            case payloads.PBK_DISTRIC_MAJOR_PARTICIPATION:
                console.log("## PBK_DISTRIC_MAJOR_PARTICIPATION -> Onde ocorreu mais sugestões para o Plano de Metas 2017?"); //OK
                api_ai.sendApiAi(senderId, 'Onde ocorreu mais sugestões para o Plano de Metas 2017?', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas"  -> Participação popular -> audiências publicas
            case payloads.PBK_AUDIENCES_PARTICIPATION:
                console.log("## PBK_AUDIENCES_PARTICIPATION -> Como foi feita a contribuição da população nas Audiências públicas de 2017?"); //OK
                api_ai.sendApiAi(senderId, 'Como foi feita a contribuição da população nas Audiências públicas de 2017?', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas" -> Participação popular -> plataformas eletronicas
            case payloads.PBK_PLATFORM_PARTICIPATION:
                console.log("## PBK_PLATFORM_PARTICIPATION -> Como foi feita a contribuição da população por plataforma eletrônica em 2017?"); //OK
                api_ai.sendApiAi(senderId, 'Como foi feita a contribuição da população por plataforma eletrônica em 2017', 'botcube_co');
                break;
            //Fluxo "Conhecer a lei de metas" -> Participação popular -> Oficios/emails
            case payloads.PBK_EMAIL_PARTICIPATION:
                console.log("## PBK_EMAIL_PARTICIPATION -> Como a população contribui com a lei de metas por Ofícios/emails em 2017?"); //OK
                api_ai.sendApiAi(senderId, 'Como a população contribui com a lei de metas por Ofícios/emails em 2017?', 'botcube_co');
                break;

            //Fluxo "Conhecer a lei de metas" -> "Cidades que aderiram"
            case payloads.PBK_CITIES_INFO:
                console.log("## PBK_CITIES_INFO -> Cidades que aderiram"); //OK
                api_ai.sendApiAi(senderId, 'Quais cidades aderiram a Lei de Metas?', 'botcube_co'); 
                break;
            //Fluxo "Conhecer a lei de metas" -> "Cidades que aderiram"-> "Minha cidade implantou a lei?"
            case payloads.PBK_MY_CITY:
                console.log("## PBK_MY_CITY -> Minha cidade implantou a lei?"); //OK
                api_ai.sendApiAi(senderId, 'Quero saber se minha cidade já implantou a lei de metas', 'botcube_co');
                break;



            //Fluxo "Conhecer Gestão passada"
            case payloads.PBK_PAST_MANAGEMENT:
                console.log("## PBK_PAST_MANAGEMENT -> Plano de metas da gestão passada"); //OK
                api_ai.sendApiAi(senderId, 'Plano de metas da gestão passada', 'botcube_co');
                break;


            //** METAS **//
            //Fluxo "Conhecer Gestão passada" -> Metas
            case payloads.PBK_PAST_GOAL:
                console.log("## PBK_PAST_GOAL -> Conhecer as metas"); //OK
                api_ai.sendApiAi(senderId, 'Conhecer as metas', 'botcube_co');
                break;

            //Usuário clicou em projetos da meta que ele esta visualizando
            case payloads.PBK_PROJECTS_OF_GOAL:
                console.log('## PBK_PROJECTS_OF_GOAL -> usuário clicou em "Projetos da meta"'); //OK

                if(mCurrent.get(senderId)) {
                    var districts = concatDistritcs(mCurrent.get(senderId).region);
                    var text = "Essa meta é composta por ".concat(mCurrent.get(senderId).project_count).concat(" projetos, nos quais impactam os seguintes distritos: ").concat(districts);
                    ResMS.message(senderId, text);
                    var text = "O que mais você gostaria de saber?";
                    ResMS.optionsPastManagementGoal(senderId, mCurrent.get(senderId), text);
                }
                break;
            //
            case payloads.PBK_GOAL_EXECUTION:
                console.log('## PBK_GOAL_EXECUTION -> usuário clicou em "Execução da meta"'); //OK
                if(mCurrent.get(senderId)) {
                    var text = "De acordo com a prefeitura, ".concat(mCurrent.get(senderId).percentages.owned).concat("% dessa meta foi concluída.");
                    ResMS.message(senderId, text);
                    var text = "O que mais você gostaria de saber?";
                    ResMS.optionsPastManagementGoal(senderId, mCurrent.get(senderId), text);
                }
                break;
            //
            case payloads.PBK_GOAL_BUDGET:
                console.log('## PBK_GOAL_BUDGET -> usuário clicou em "Orçamento da meta"'); //OK
                if(mCurrent.get(senderId)) {
                    var text = "O investimento total previsto para a Meta ".concat(mCurrent.get(senderId).goal_number).concat(" - ").concat(mCurrent.get(senderId).name).concat(" foi no valor de R$ ").concat(formatReal(mCurrent.get(senderId).expected_budget));
                    ResMS.message(senderId, text);
                    var text = "O que mais você gostaria de saber?";
                    ResMS.optionsPastManagementGoal(senderId, mCurrent.get(senderId), text);
                }
                break;
            //
            case payloads.PBK_COMPARE_GOAL:
                console.log('## PBK_COMPARE_GOAL -> usuário clicou em "Comparar meta"'); //OK
                if(mCurrent.get(senderId)) {
                    net.getPastGoals(senderId, null, null, function(error, data) {
                        createMessageCompareGoals(senderId, data.goals);
                    });
                } 
                break;
            

            //** PROJETOS **//
            //Conhecer os projetos da gestão passada
            case payloads.PBK_PAST_PROJECT:
                console.log("## PBK_PAST_PROJECT -> Conhecer os projetos"); //OK
                api_ai.sendApiAi(senderId, 'Conhecer os projetos', 'botcube_co');
                break;
            //usuário clicou em meta desse projeto
            case payloads.PBK_GOAL_OF_PROJECT:
                console.log('## PBK_GOAL_OF_PROJECT -> apiAi_controller.optionsActionsApiAi'); //OK
                if(mCurrent.get(senderId)) {
                    var text = "Esse projeto faz parte da Meta ".concat(mCurrent.get(senderId).goal.id).concat(" - ").concat(mCurrent.get(senderId).goal.name);
                    ResMS.message(senderId, text);
                    var text = "O que mais você gostaria de saber?";
                    ResMS.optionsPastManagementProject(senderId, mCurrent.get(senderId), text);
                } 
                break;
            //usuário clicou em execução do projeto
            case payloads.PBK_PROJECT_EXECUTION:
                console.log('## PBK_PROJECT_EXECUTION -> apiAi_controller.optionsActionsApiAi'); //OK
                if(mCurrent.get(senderId)) {
                    var text = "De acordo com a prefeitura, ".concat(mCurrent.get(senderId).percentage).concat("% desse projeto já foi executado.");
                    ResMS.message(senderId, text);
                    var text = "O que mais você gostaria de saber?";
                    ResMS.optionsPastManagementProject(senderId, mCurrent.get(senderId), text);
                }
                break;
            //usuário clicou em comprar meta
            case payloads.PBK_COMPARE_PROJECTS:
                console.log("## PBK_COMPARE_PROJECTS -> Conhecer os projetos"); //OK
                if(mCurrent.get(senderId)) {
                    net.getPastProjects(senderId, null, mCurrent.get(senderId).region.id, function(error, data) {
                        createMessageCompareProjects(senderId, data.projects);
                    });
                } 
                break;



            /** SELEÇÃO DE  METAS OU PROJETOS **/
            //Usuário seleciona uma das metas resultantes de sua busca
            case payloads.PBK_GOAL_SELECTED:
                console.log("## PBK_GOAL_SELECTED -> Usuário selecionou uma meta"); //OK
                var text_intro = "Legal, só um segundo que vou lher dar uma descrição geral da meta ".concat(postback.title).concat(" ;)");
                ResMS.message(senderId, text_intro);
                net.getPastGoalId(senderId, postback.title, function(error, data) {
                    if(data) {
                        console.log("Busca de meta por id com sucesso");
                        console.log("***** GOAL");
                        //console.log(data);
                        //console.log("*****");

                        mCurrent.set(senderId, data);

                        ResMS.sendMessageDescriptionGoal(senderId, mCurrent.get(senderId).description);
                        var text = "Caso queira, também posso lhe dar mais informações sobre a meta. Como os projetos que compoẽ ela, o status da execução, o orçamento, ou até mesmo comparar essa meta com outras. O que deseja saber?";
                        ResMS.optionsPastManagementGoal(senderId, mCurrent.get(senderId), text);
                    } else {
                        console.log("Erro ao buscar meta por id -> error: ", error);
                    }
                });
                break;
            //Usuário seleciona uma das metas resultantes de sua busca
            case payloads.PBK_PROJECT_SELECTED:    
                console.log("## PBK_PROJECT_SELECTED -> Usuário selecionou um projeto"); //OK
                console.log("title: ", postback.title);

                net.getPastProjectsId(senderId, postback.title, function(error, data) {
                    if(data) {
                        console.log("Busca de projeto por id com sucesso");
                        mCurrent.set(senderId, data);
                        descriptionProjetct(senderId, data);
                    } else {
                        console.log("Erro ao buscar meta por id -> error: ", error);
                    }
                });
                break;



            default:
                console.log('## DEFAULT');
                var messageText = event.message ? event.message.text : "";
                api_ai.sendApiAi(senderId, messageText, 'botcube_co');
        }
    },

    processAttachmentsReceived(event) {

        console.log('messenger_controller.processAttachmentsReceived - Anexo!');

    },
}


function callback(error, data, senderId) {
    if (!error) {
        console.log('Sucesso na captura dos dados do usuário!');
        console.log(data);

        User.create_user(senderId, data);

    } else {
        console.log('Falha na captura dos dados do usuário!');
        console.log(response.statusCode);
        console.log(body);
    }
}


function descriptionProjetct(senderId, project) {
    //verifica se existe lat e long para capturar endereço correspondente ao ao lat e long
    if(project.latitude && project.latitude > 0 && project.longitude && project.longitude > 0) {
        geocoder.reverse({lat:project.latitude, lon:project.longitude})
          .then(function(res) {
                //Pega os dados do endereço
                var streetNeighborhood = res[0].extra['neighborhood'];
                var streetName = res[0].streetName;
                //envia mensagem com descrição do projeto
                var text = "O Projeto ".concat(project.name).concat(" é um dos projetos da Meta ").concat(project.goal.name).concat(", e esta situado na ").concat(streetName).concat(", no ").concat(streetNeighborhood);
                MS.textMessage(senderId, text);

                //envia mensagem e opções referentes ao detalhes do projeto
                var text = "Também posso lhe dar outras informações deste projeto, como status da execução, orçamento e comparações com outros projetos.";
                ResMS.optionsPastManagementProject(senderId, mCurrent.get(senderId), text);
          })
           .catch(function(err) {
                console.log(err);
          });
    } else {
        //envia mensagem com descrição do projeto
        var text = "O Projeto ".concat(project.name).concat(" é um dos projetos da Meta ").concat(project.goal.name)
        MS.textMessage(senderId, text);
        //envia mensagem e opções referentes ao detalhes do projeto
        var text = "Caso queira, também posso lhe dar mais informações sobre o projeto. Como status da execução, o orçamento, ou até mesmo comparar esse projeto com outras. O que deseja saber?";
        ResMS.optionsPastManagementProject(senderId, project, text);
    }
}


function createMessageCompareProjects(senderId, projects) {
    var text;
    projects.sort(function(a,b) {
        return b.percentage - a.percentage;
    });

    if(projects && projects.length >= 3) {

        console.log("* mCurrent.name: ", mCurrent.get(senderId).name, " - mCurrent.percentage: ", mCurrent.get(senderId).percentage);

        projects.forEach(function(project) {
            console.log("* project.name: ", project.name, " - project.percentage: ", project.percentage);
        });

        var position = projects.findIndex(item => item.id === mCurrent.get(senderId).id)+1;
        console.log("position: ", position);


        //Projetos com valores de "percentage" iguais, tanto melhor meta, pior meta e meta corrente
        if(projects[0].id == mCurrent.get(senderId).id && projects[projects.length-1].id == mCurrent.get(senderId).id) {
           text = "O Projeto ".concat(mCurrent.get(senderId).name).concat(", é um dos ")
                .concat(projects.length).concat(" projetos para o distrito ")
                .concat(mCurrent.get(senderId).region.name).concat(", onde todos os projetos estão com ")
                .concat(projects[0].percentage).concat("% de progresso.");
        } 
        //
        else if(projects[0].id == mCurrent.get(senderId).id) {
            text = "O projeto ".concat(mCurrent.get(senderId).name).concat(", é um dos ")
                .concat(projects.length).concat(" projetos para o distrito ").concat(mCurrent.get(senderId).region.name)
                .concat(", e esta entre os primeiros no ranking de projetos mais adiantados em suas execuções. Veja só:\n* 1°: ")
                .concat(mCurrent.get(senderId).name).concat(" - ").concat(mCurrent.get(senderId).percentage).concat("%\n* 2°: ")
                .concat(projects[1].name).concat(" - ").concat(projects[1].percentage).concat("%\n* Ultimo:  ")
                .concat(projects[projects.length-1].name).concat(" - ").concat(projects[projects.length-1].percentage).concat("%");
        } 
        //
        else if(projects[projects.length-1].id == mCurrent.get(senderId).id) {
            text = "O projeto ".concat(mCurrent.get(senderId).name).concat(", é um dos ")
                .concat(projects.length).concat(" projetos para o distrito ").concat(mCurrent.get(senderId).region.name)
                .concat(", e é o ultimo no ranking sobre execução do projeto do distrito. Veja só:\n* 1°: ")
                .concat(projects[0].name).concat(" - ").concat(projects[0].percentage).concat("%\n* 2°: ")
                .concat(projects[1].name).concat(" - ").concat(projects[1].percentage).concat("%\n* Ultimo:  ")
                .concat(projects[projects.length-1].name).concat(" - ").concat(projects[projects.length-1].percentage).concat("%");
        } 
        //
        else {
            text = "O projeto ".concat(mCurrent.get(senderId).name).concat(", é um dos ")
                .concat(projects.length).concat(" projetos para o distrito ").concat(mCurrent.get(senderId).region.name)
                .concat(", e é o ").concat(position).concat("° no ranking de projetos mais adiantados em suas execuções. Veja só:\n* 1°: ")
                .concat(projects[0].name).concat(" - ").concat(projects[0].percentage).concat("%\n* 2°: ")
                .concat(projects[1].name).concat(" - ").concat(projects[1].percentage).concat("%\n* Ultimo:  ")
                .concat(projects[projects.length-1].name).concat(" - ").concat(projects[projects.length-1].percentage).concat("%");
        }

    } 
    else if(projects && data.projects.length == 2) 
    {
        text = "Existem apenas 2 projetos para o distrito "
            .concat(mCurrent.get(senderId).region.name).concat(" com o seguindo progresso segunda a prefeitura:\n* 1° ")
            .concat(projects[0].name).concat(" - ").concat(projects[0].percentage).concat("%\n* 2° ")
            .concat(projects[1].name).concat(" - ").concat(projects[1].percentage).concat("%");
    } 
    else 
    {
        text = "Esse é o único projeto para o distrito ".concat(mCurrent.get(senderId).region.name)
            .concat(", e possui um progresso de ").concat(mCurrent.get(senderId).percentage).concat("%.");
    }

    MS.textMessage(senderId, text);
    var text = "O que mais você gostaria de saber?";
    ResMS.optionsPastManagementProject(senderId, mCurrent.get(senderId), text);
}

function createMessageCompareGoals(senderId, goals) {
    //Envia mensagem comparando execução da meta para o distrito
    var executionText = createMessageCompareGoalsExecution(senderId, goals);
    MS.textMessage(senderId, executionText);
    var text = "O que mais você gostaria de saber?";
    //Envia mensagem comparando investimentos previstos para o distrito
    var investmentText = createMessageCompareGoalsInvestment(senderId, goals);
    MS.textMessage(senderId, investmentText);
    var text = "O que mais você gostaria de saber?";
    //Envia opções de metas
    ResMS.optionsPastManagementGoal(senderId, mCurrent.get(senderId), text);
}

function createMessageCompareGoalsExecution(senderId, goals) {
    var text;

    goals.sort(function(a,b) {
        return b.percentage.owned - a.percentage.owned;
    });

    //
    if(goals.length > 0) {
        var position = goals.findIndex(item => item.id === mCurrent.get(senderId).id)+1;
        if(goals[0].id == mCurrent.get(senderId).id && goals[goals.length-1].id == mCurrent.get(senderId).id) {
            text = "A Meta ".concat(mCurrent.get(senderId).id).concat(", é uma das ")
                    .concat(goals.length).concat(" metas que impactam o distrito ")
                    .concat(mCurrent.get(senderId).region.name).concat(", onde todas as metas estão com ")
                    .concat(goals[0].percentage.owned).concat("% de progresso.");
        }
        //
        else if(goals[0].id == mCurrent.get(senderId).id) {
            text = "A Meta "
                .concat(mCurrent.get(senderId).id)
                .concat(", está entre as primeiras no ranking de metas mais adiantados no que diz respeito a execução. Veja só:\n* 1°: Meta ")
                .concat(mCurrent.get(senderId).id)
                .concat(" - ")
                .concat(mCurrent.get(senderId).percentage.owned)
                .concat("%\n* 2°: Meta ")
                .concat(goals[1].id)
                .concat(" - ")
                .concat(goals[1].percentage.owned)
                .concat("%\n* ")
                .concat(goals.length)
                .concat("° (último):  Meta ")
                .concat(goals[goals.length-1].id)
                .concat(" - ")
                .concat(goals[goals.length-1].percentage.owned)
                .concat("%");
        }
        //
        else if(goals[goals.length-1].id == mCurrent.get(senderId).id) {
            text = "A meta "
                .concat(mCurrent.get(senderId).id)
                .concat(" é a ultima no ranking de execução das metas. Veja só:\n* 1°: Meta ")
                .concat(goals[0].id)
                .concat(" - ")
                .concat(goals[0].percentage.owned)
                .concat("%\n* 2°: Meta ")
                .concat(goals[1].id)
                .concat(" - ")
                .concat(goals[1].percentage.owned)
                .concat("%\n* ")
                .concat(goals.length)
                .concat("° (último):  Meta ")
                .concat(goals[goals.length-1].id)
                .concat(" - ")
                .concat(goals[goals.length-1].percentage.owned)
                .concat("%");
        }
        //
        else {
            text = "A Meta "
                .concat(mCurrent.get(senderId).id)
                .concat(" é a ")
                .concat(position)
                .concat("° no ranking das metas mais adiantados em sua execução. Veja só:\n* 1°: Meta ")
                .concat(goals[0].id)
                .concat(" - ")
                .concat(goals[0].percentage.owned)
                .concat("%\n* 2°: Meta ")
                .concat(goals[1].id)
                .concat(" - ")
                .concat(goals[1].percentage.owned)
                .concat("%\n* ")
                .concat(position)
                .concat("° Meta ")
                .concat(mCurrent.get(senderId).id)
                .concat(" - ")
                .concat(mCurrent.get(senderId).percentages.owned)
                .concat("%\n* ")
                .concat(goals.length)
                .concat("° (último):  Meta ")
                .concat(goals[goals.length-1].id)
                .concat(" - ")
                .concat(goals[goals.length-1].percentage.owned)
                .concat("%");
        }

    } 
    return text;
}

function createMessageCompareGoalsInvestment(senderId, goals) {

    var text;
    goals.sort(function(a,b) {
        return b.expected_budget - a.expected_budget;
    });

    //
    if(goals && goals.length >= 3) 
    {
        var position = goals.findIndex(item => item.id === mCurrent.get(senderId).id)+1;
        //
        if(goals[0].id == mCurrent.get(senderId).id && goals[goals.length-1].id == mCurrent.get(senderId).id) {
            text = "E todas as metas da cidade possuem o mesmo valor de investimento previsto, sendo R$"
                .concat(formatReal(mCurrent.get(senderId).expected_budget))
                .concat("investidos para cada uma das ")
                .concat(goals.length)
                .concat("metas");
        }
        //
        else if(goals[0].id == mCurrent.get(senderId).id) {
            text = "Essa meta também esta entre as primeiras no ranking de valores de investimento previsto. Veja só:\n* 1°: Meta "
                .concat(mCurrent.get(senderId).id)
                .concat(" - R$ ")
                .concat(formatReal(mCurrent.get(senderId).expected_budget))
                .concat("\n* 2°: Meta ")
                .concat(goals[1].id)
                .concat(" - R$ ")
                .concat(formatReal(goals[1].expected_budget))
                .concat("\n* ")
                .concat(goals.length)
                .concat("° (último):  Meta ")
                .concat(goals[goals.length-1].id)
                .concat(" - R$ ")
                .concat(formatReal(goals[goals.length-1].expected_budget));
        }
        //
        else if(goals[goals.length-1].id == mCurrent.get(senderId).id) {
            text = "Essa meta também é uma das metas com menor valor investido da cidade. Veja só:\n* 1°: Meta "
                .concat(mCurrent.get(senderId).id)
                .concat(" - R$ ")
                .concat(formatReal(mCurrent.get(senderId).expected_budget))
                .concat("\n* 2°: Meta ")
                .concat(goals[1].id)
                .concat(" - R$ ")
                .concat(formatReal(goals[1].expected_budget))
                .concat("\n* ")
                .concat(goals.length)
                .concat("° (último):  Meta ")
                .concat(goals[goals.length-1].id)
                .concat(" - R$ ")
                .concat(formatReal(goals[goals.length-1].expected_budget));
        }
        //
        else {
            console.log("current.expected_budget: ", mCurrent.get(senderId).expected_budget);
            text = "Essa meta também é a "
                .concat(position)
                .concat("ª no ranking de maiores valores investidos. Veja só:\n* 1°: Meta ")
                .concat(goals[0].id)
                .concat(" - R$ ")
                .concat(formatReal(goals[0].expected_budget))
                .concat("\n* ")
                .concat(position)
                .concat("°: Meta ")
                .concat(mCurrent.get(senderId).id)
                .concat(" - R$ ")
                .concat(formatReal(mCurrent.get(senderId).expected_budget))
                .concat("\n* ")
                .concat(goals.length)
                .concat("° (último):  Meta ")
                .concat(goals[goals.length-1].id)
                .concat(" - R$ ")
                .concat(formatReal(goals[goals.length-1].expected_budget));
        }
    }
    //
    else if(goals && goals.length == 2) 
    {
        text = "Com relação a investimento previsto: \n* 1° Meta "
            .concat(mCurrent.get(senderId).id)
            .concat(" - R$ ")
            .concat(formatReal(mCurrent.get(senderId).expected_budget))
            .concat("\n* 2°: Meta ")
            .concat(goals[1].id)
            .concat(" - R$ ")
            .concat(formatReal(goals[1].expected_budget));
    }
    //
    else if(goals)
    {
        text = "Possui um investimento de R$"
            .concat(formatReal(goals[1].expected_budget));
    }

    return text;
}


function concatDistritcs(regions) {
    var districts = '';
    if(regions && regions.length > 0) {
        var i = 0;
        do {
           if(i < regions.length -1) {
                districts += regions[i].name + ', ';
            } else {
                districts += regions[i].name;
            }
            i += 1;
        } while (i < regions.length);
    }

    return districts;
}

function formatReal( int )
{
        var tmp = int+'00';
        var neg = false;
        if(tmp.indexOf("-") == 0)
        {
            neg = true;
            tmp = tmp.replace("-","");
        }

        if(tmp.length == 1) tmp = "0"+tmp

        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        if( tmp.length > 9)
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2,$3");

        if( tmp.length > 12)
            tmp = tmp.replace(/([0-9]{3}).([0-9]{3}).([0-9]{3}),([0-9]{2}$)/g,".$1.$2.$3,$4");

        if(tmp.indexOf(".") == 0) tmp = tmp.replace(".","");
        if(tmp.indexOf(",") == 0) tmp = tmp.replace(",","0,");

    return (neg ? '-'+tmp : tmp);
}