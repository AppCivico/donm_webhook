'use strict';

const config = require('../config');
const request = require('request');
const HashMap = require('hashmap');
const MS = require('./messenger_actions');
const net = require('./net');
const nodeGeocoder = require('node-geocoder');
const urls = require('../const/constants_url');
const payloads = require('../const/constants_payload');
const actions = require('../const/constants_action');
const cities = require('../const/cities');
const themes = require('../const/theme');
const districts = require('../const/district');
const sleep = require('./sleepMessenger');
const ResMS = require('./responseMessenger');
const Verify = require('./verify');



var options = {
  provider: 'google',
  httpAdapter: 'https', // Default
};

var geocoder = nodeGeocoder(options);


module.exports = {

	optionsActionsApiAi(senderId, response) {
		var action = response.result.action;
		var actionIncomplete = response.result.actionIncomplete;
		
		console.log("* apiAi_controller.optionsActionsApiAi - action: ", action, " - actionIncomplete: ", actionIncomplete);

		switch(action) {
			//Usuário inicia diálogo com "oi" (Intent: greetings, Action: greetings_action)
			case actions.ACTION_GREETINGS:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_GREETINGS'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.initDialogs(senderId);
		    	break;
		    //Usuário deseja iniciar diálogo "Vamos começar?" (Intent: start_dialog, Action: start_dialog_action)
		    case actions.ACION_START_DIALOG:
				console.log('## apiAi_controller.optionsActionsApiAi - ACION_START'); //OK
				ResMS.presentFirstDialogOptions(senderId);
		    	break;
		    		


			//Usuário deseja "Conhecer a lei de metas" (Intent: what_goal_plan, Action: start_flow_know_action)
			case actions.ACTION_START_FLOW_KNOW:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_START_FLOW_KNOW'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.menuAboutLaw(senderId);
		    	break;


		    //Usuário perguntou "Quais as obrigações da prefeitura"
		    case actions.ACTION_OBLIGATIONS:
		    	console.log('## apiAi_controller.optionsActionsApiAi - ACTION_OBLIGATIONS'); //OK
		    	ResMS.responseMessage(senderId, response);
		    	ResMS.optionsObligationTargetLaw(senderId);
		    	break;
		    //Usuário perguntou "O que deve conter no plano de metas"
		    case actions.ACTION_SHOULD_CONTAIN:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_SHOULD_CONTAIN'); //OK
		    	ResMS.responseMessage(senderId, response);
		    	ResMS.optionsObligationTargetLawMore(senderId, actions.ACTION_SHOULD_CONTAIN);
		    	break;
		    //Usuário perguntou "Como acompanhar o plano de metas"
		    case actions.ACTION_ACCOUNTABILITY:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_ACCOUNTABILITY'); //OK
		    	ResMS.responseMessage(senderId, response);
		    	ResMS.responseLinkDonm(senderId);
		    	ResMS.optionsObligationTargetLawMore(senderId, actions.ACTION_ACCOUNTABILITY);		    	
		    	break;
		    //Usuário perguntou "O que são audiências públicas?"
			case actions.ACTION_PUBLIC_AUDIENCE:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_PUBLIC_AUDIENCE'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsObligationTargetLawMore(senderId, actions.ACTION_PUBLIC_AUDIENCE);		 
				break;

			
			//Usuário perguntou "Como foi a participação popular na Gestão 2017? (Intent: popular_paticipation_info , Action: popular_paticipation_info_action)"
			case actions.ACTION_POPULAR_PARTICIPATION_INFO:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_POPULAR_PARTICIPATION_INFO'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsPopularParticipation2017Management(senderId);
				break;
			//Usuário perguntou "Onde ocorreu mais sugestões para o Plano de Metas 2017?" (Intent: district_major_participation, Action: district_major_participation_action)
			case actions.ACTION_DISTRICT_MAJOR_PARTICIPATION:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_DISTRICT_MAJOR_PARTICIPATION'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsPopularParticipation2017ManagementMore(senderId, actions.ACTION_DISTRICT_MAJOR_PARTICIPATION);
				break;
			//Usuário perguntou "Como foi feita a contribuição da população nas Audiências públicas de 2017?" (Intent: public_audiences_participation, Action: public_audiences_participation_action)
			case actions.ACTION_PUBLIC_AUDIENCE_PARTICIPATION:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_PUBLIC_AUDIENCE_PARTICIPATION'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsPopularParticipation2017ManagementMore(senderId, actions.ACTION_PUBLIC_AUDIENCE_PARTICIPATION);
				break;
			//Usuário perguntou "Como foi feita a contribuição da população por plataforma eletrônica em 2017" (Intent: platform_participation, Action: platform_participation_action)
			case actions.ACTION_PLATFORM_PARTICIPATION_ACTION:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_PLATFORM_PARTICIPATION_ACTION'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsPopularParticipation2017ManagementMore(senderId, actions.ACTION_PLATFORM_PARTICIPATION_ACTION);
				break;
			//Usuário perguntou "Como a população contribui com a lei de metas por Ofícios/emails em 2017?" (Intent: email_participation, Action: email_participation_action)
			case actions.ACTION_EMAIL_PARTICIPATION:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_EMAIL_PARTICIPATION'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsPopularParticipation2017ManagementMore(senderId, actions.ACTION_EMAIL_PARTICIPATION);
				break;	


		    //Usuário perguntou "Quais cidades aderiram a Lei de Metas?" (Intent: participating_cities, Actions: participating_cities_options)
			case actions.ACTION_CITIES:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_CITIES'); //OK
				ResMS.responseMessage(senderId, response);
			    ResMS.messsengerCardCities(senderId, response);
			  	break;
			//Usuário perguntou "Quero saber se minha cidade já implantou a lei de metas" (Intent: my_city_question, Action: my_city_question, Context_output: participating_cities_ctx)
  			case actions.ACTION_MY_CITY:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_MY_CITY'); //OK
				ResMS.responseMessage(senderId, response);
				break;
			//Usuário enviou o nome de sua cidade, após perguntar se sua cidade implantou a lei de metas (Intent: cities_verify, Action: city_verify, Context_input: participating_cities_ctx)
			case actions.ACTION_CITY_VERIFY:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_CITY_VERIFY'); //OK
				ResMS.verifyMyCity(senderId, response);
				break;



			//Usuário perguntou "Plano de metas da gestão passada (Intent: past_management, Action: past_management_action)"
			case actions.ACTION_PAST_MANAGEMENT:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_PAST_MANAGEMENT'); //OK
				ResMS.responseMessage(senderId, response);
				ResMS.optionsPastManagement(senderId);
				break;


			//Usuário perguntou "Conhecer as metas" ou "{distric_name}, ou {theme_name}" (Intent: search_for_goal, Action: search_for_goal_action)
			case actions.ACTION_SEARCH_GOAL:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_SEARCH_GOAL'); //OK

				if(actionIncomplete === true) {
					//Envia mensagem pedindo dados faltantes
					ResMS.responseMessage(senderId, response);
				} else {
					//Envia mensagem
					ResMS.responseMessage(senderId, response);
					//Pega os parametros
					var district = response.result.parameters['district'];
					var theme = response.result.parameters['theme'];
					//Busca metas da gestão passada com base nos parametros
					net.getPastGoals(senderId, themes.search(theme), districts.search(district), function(error, data) {
						sendMesseageGoals(senderId, data)
					});
				}
				break;
			//Usuário perguntou "Conhecer os projetos" ou "{distric_name}, ou {theme_name}" (Intent: search_for_project, Action: search_for_project_action)"
			case actions.ACTION_SEARCH_PROJECT:
				console.log('## apiAi_controller.optionsActionsApiAi - ACTION_SEARCH_PROJECT'); //OK

				if(actionIncomplete === true) {
					//Envia mensagem pedindo dados faltantes
					ResMS.responseMessage(senderId, response);
				} else {
					//Envia mensagem
					ResMS.responseMessage(senderId, response);
					//Pega os parametros
					var district = response.result.parameters['district'];
					var theme = response.result.parameters['theme'];

					//Busca metas da gestão passada com base nos parametros
					net.getPastProjects(senderId, themes.search(theme), districts.search(district), function(error, data) {
						sendMesseageProjetcs(senderId, data)
					});
				}
				break;


			default:
				console.log('apiAi_controller.optionsActionsApiAi - default');
				ResMS.responseMessage(senderId, response);
		}

	},

	/*trataActionTemperatura() {
		console.log('## apiAi_controller.trataActionTemperatura...');

	    var actionTemperatura = parameters.temperatura;
	    switch(actionTemperatura) {
	        case 'Aumente':
	            console.log('Ok, vamos aumentar a temperatura');
	            break;
	        case 'Diminua': 
	            console.log('Ok, vamos aumentar a temperatura');
	            break;
	        default:
	            console.log('trataActionTemperatura defaul response');
	    }
	}*/

}



/*
 	Cria cards com dados das metas
*/
function createCardsGoals(data) {
	var elements = [];
    data.goals.forEach(function(goal) {
    	elements.push(
            MS.genericElements(
                "Meta ".concat(goal.goal_number), 
                goal.name, 
                [MS.genericButtonPostback(payloads.PBK_GOAL_SELECTED, goal.goal_number)], 
                'http://blog.vejaobra.com.br/wp-content/uploads/2017/01/conteudo-avancado-diario-de-obra-por-que-manter-o-historico-de-execucao-do-projeto-1280x640.jpeg'
	        )
	    );
    });
    return elements;
}

/*
 	Cria cards com dados dos projetos
*/
function createCardsProjects(data) {
	var elements = [];
    data.projects.forEach(function(project) {
    	elements.push(
            MS.genericElements(
                "Projeto ".concat(project.project_number), 
                project.name, 
                [MS.genericButtonPostback(payloads.PBK_PROJECT_SELECTED, project.id)], 
                'http://blog.vejaobra.com.br/wp-content/uploads/2017/01/conteudo-avancado-diario-de-obra-por-que-manter-o-historico-de-execucao-do-projeto-1280x640.jpeg'
	        )
	    );
    });
    return elements;
}

/*
	Decide como enviar os dados referentes as metas para o usuário
*/
function sendMesseageGoals(senderId, data) {

	console.log("apiAI_controller.sendMesseageGoals - data: ", data);

	//Caso tenha mais que 1 meta, são criados cards para cada meta
	if(data && data.goals && data.goals.length > /*1*/ 0) 
	{
		console.log("apiAI_controller.sendMesseageGoals - Tem mais de um item, os cards serão criados");
		MS.genericCardMenu(senderId, createCardsGoals(data));
	} 
	//Caso tenha apenas 1 meta, é enviada a mensagem com dados do projeto
	/*else if(data && data.goals && data.goals.length == 1) 
	{
		console.log("apiAI_controller.sendMesseageGoals - Apenas uma meta, mostrar dados da meta");
		var text = "Existe apenas uma meta, ";
		MS.genericCardMenu(senderId, createCardsGoals(data));
	}*/
	//Caso não tenha nenhuma meta, é enviada mensagem ao usuário avisando-o
	else
	{
		console.log("apiAI_controller.sendMesseageGoals - Nenhuma meta, avisar usuário");
		//Buscar os temas de um disitrito

		//Mensagem perguntando se usuário gostaria de procurar outra meta
		var text = "Nenhuma meta para esse tema no distrito escolhido. Quer continuar buscando metas para outro distrito ou para outro tema? Ou prefere conhecer os projetos da cidade de São Paulo?";
		ResMS.optionsPastManagementSearchFailure(senderId, text);
	}
}

/*
	Decide como enviar os dados referentes aos projetos para o usuário
*/
function sendMesseageProjetcs(senderId, data) {
	//Caso tenha mais que 1 projeto, são criados cards para cada projeto
	if(data.projects && data.projects.length > 0/*1*/) 
	{
		console.log("apiAI_controller.sendMesseageProjetcs - Tem mais de um item, os cards serão criados");
		MS.genericCardMenu(senderId, createCardsProjects(data));
	} 
	//Caso tenha apenas 1 projeto, é enviada a mensagem com dados do projeto
	/*else if(data.projects && data.projects.length == 1) 
	{
		console.log("apiAI_controller.sendMesseageProjetcs - Apenas um projeto, mostrar dados do projeto");
		descriptionProjetct(senderId, data.project);
	}*/
	//Caso não tenha nenhuma meta, é enviada mensagem ao usuário avisando-o
	else
	{
		console.log("apiAI_controller.sendMesseageProjetcs - Nenhum projeto, avisar usuário");

		//Mensagem perguntando se usuário gostaria de procurar outra meta
		var text = "Nenhum projeto para esse tema no distrito escolhido. Quer continuar buscando projetos para outro distrito ou  outro tema? Ou prefere conhecer as metas para a cidade de São Paulo?";
		ResMS.optionsPastManagementSearchFailure(senderId, text);
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
                var text = "Caso queira, também posso lhe dar mais informações sobre o projeto. Como status da execução, o orçamento, ou até mesmo comparar esse projeto com outras. O que deseja saber?";
                ResMS.optionsPastManagementProject(senderId, mCurrent, text);
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