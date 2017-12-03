const HashMap = require('hashmap');

const map = new HashMap();
	//Bahia
	map.set("Euclides da Cunha", ["Sim, Euclides da Cunha esta usando a o Plano de Metas.", "A cidade de Euclides da Cunha já implantou a Lei de Metas", "Sim, a Lei de Metas já foi implantada na cidade de Euclides da Cunha"]);
	map.set("Eunápolis", ["Sim, Eunápolis esta usando a o Plano de Metas.", "A cidade de Eunápolis já implantou a Lei de Metas", "Sim, a cidade de Eunápolis já conta com a Lei de Metas"]);
	map.set("Ilhéus", ["Sim, Ilhéus esta usando a o Plano de Metas.", "Sim, a cidade de Ilhéus já implantou a Lei de Metas."]);
	//Espírito Santo
	map.set("Vitória", ["Sim, Vitória esta usando a o Plano de Metas.", "Sim, a cidade de Vitória já implantou a Lei de Metas."]);
	map.set("Alegre", ["Sim, Alegre esta usando a o Plano de Metas.", "A cidade de Alegre já implantou a Lei de Metas."]);
    //Goiás
	map.set("Anápolis", ["Sim, Anápolis esta usando a o Plano de Metas.", "Sim, já foi implantada a Lei de Metas em Anápolis."]);
	//Maranhão
	map.set("Timbiras", ["Sim, Timbiras esta usando a o Plano de Metas.", "Sim, a cidade de Timbiras já implantou o Plano de Metas"]);
	//Mato Grosso
	map.set("Pontes", ["Sim, Pontes esta usando a o Plano de Metas.", "Sim, a cidade de Pontes já possui a Lei de Metas"]);
	map.set("Lacerda", ["Sim, Lacerda esta usando a o Plano de Metas.", "A cidade de Lacerda já conta com a Lei de Metas"]);
	//Mato Grosso do Sul
	map.set("Dourados", ["Sim, Dourados esta usando a o Plano de Metas.", "Sim, a cidade de Dourados já esta usando a Lei de Metas"]);
	//Minas Gerais
	map.set("Belo Horizonte", ["Belo Horizonte já tem Lei de Metas implantada.", "A cidade de Belo Horizonte já conta com a Lei de Metas"]);
    map.set("Betim", ["Betim já implantou a Lei de Metas", "Sim, a cidade de Betim já esta usando a Lei de Metas."]);
    map.set("Formiga", ["Sim, Formiga já tem Lei de Metas implantada", "A cidade de Formiga já implantou a Lei de Metas."]);
    map.set("Ipatinga", ["Ipatinga já conta com a Lei de Metas.", "Sim, a cidade de Ipatinga já usa a Lei de Metas."]);
	map.set("Itabira", ["Sim, Itabira esta usando a o Plano de Metas.", "A cidade de Itabira já esta utilizando a Lei de Metas."]);
	map.set("Itaúna", ["Sim, Itaúna esta usando a o Plano de Metas.", "Sim, a cidade de Itaúna implantou a Lei de Metas."]);
	map.set("Ouro Branco", ["Sim, Ouro Branco esta usando a o Plano de Metas.", "Sim, já foi implantada a Lei de Metas em Ouro Branco."]);
	map.set("Uberaba", ["Sim, Uberaba esta usando a o Plano de Metas.", "A cidade de Uberaba já conta com a Lei de Metas."]);
	//Pará
	map.set("Abaetetuba", ["Sim, Abaetetuba esta usando a o Plano de Metas.", "Sim, a cidade de Abaetetuba conta com a Lei de Metas."]);
	//Paraíba
	map.set("João Pessoa", ["Sim, João Pessoa esta usando a o Plano de Metas.", "Sim, já foi implantada a Lei de Metas em João Pessoa."]);	
	//Paraná
	map.set("Londrina", ["Sim, Londrina esta usando a o Plano de Metas.", "A cidade de Londrina já conta com a Lei de Metas."]);
	map.set("Ponta Grossa", ["Sim, Ponta Grossa esta usando a o Plano de Metas.", "Ponta Grossa já implantou a Lei de Metas."]);
	map.set("Foz do Iguaçu", ["Sim, Foz do Iguaçu esta usando a o Plano de Metas.", "Foz do Iguaçu possui a Lei de Metas."]);
	//Rio de Janeiro
    map.set("Rio de Janeiro", ["Rio de Janeiro já implantou a Lei de Metas", "A cidade do Rio de Janeiro já conta com a Lei de Metas."]);
    map.set("Niterói", ["Sim, Niterói já conta com a Lei de Metas", "Sim, a cidade de Niterói já implantou a Lei de Metas."]);
    map.set("Teresópolis", ["Teresópolis já implantou a Lei das Metas.", "Sim, já foi implantada a Lei de Metas em Teresópolis."]);	
    //Rio Grande do Sul
	map.set("Canoas", ["Sim, Canoas esta usando a o Plano de Metas.", "Sim, a cidade de Conhas já conta com a Lei de Metas."]);
	map.set("Carazinho", ["Sim, Carazinho esta usando a o Plano de Metas.", "Carazinho já implantou a Lei Municipal de Metas."]);
	map.set("Porto Alegre", ["Sim, Porto Alegre esta usando a o Plano de Metas.", "Sim, a Lei Municipal de Metas já foi implantada na cidade de Proto Alegre."]);
	//Santa Catarina
	map.set("Florianópolis", ["Sim, Florianópolis esta usando a o Plano de Metas.", "Sim, a cidade de Florianópolis já conta com a Lei Municipaç de Metas."]);
	map.set("Itapema", ["Sim, Itapema esta usando a o Plano de Metas.", "A cidade de Itapema já utiliza a Lei de Metas."]);
	map.set("Joinville", ["Sim, Joinville esta usando a o Plano de Metas.", "Sim, a cidade de Joinville já conta com a Lei de Metas."]);
    //São Paulo
    map.set("Barra Bonita", ["Sim, Barra Bonita esta usando a o Plano de Metas.", "Sim, a cidade de Barra Bonita já implantou a Lei de Metas."]);
    map.set("Bragança Paulista", ["Bragança Paulista já possui o Plano de Metas.", "Sim, já esta em uso a Lei de Metas na cidade de Bragança Paulista."]);
    map.set("Campinas", ["Campinas já implantou a Lei de Metas.", "Sim, Campinas já conta com a Lei de Metas."]);
    map.set("Cosmópolis", ["Cosmópolis já implantou a Lei de Metas.", "Sim, já foi implantada a Lei de Metas em Cosmópolis."]);
    map.set("Fernandópolis", ["Fernandópolis já implantou a Lei de Metas.", "Sim, Fernandópolis já conta com a Lei de Metas."]);
    map.set("Holambra", ["Holambra já tem plano de metas.", "Holambra já conta com a Lei Municipal de Metas."]);
    map.set("Itapeva", ["Itapeva já tem plano de metas.", "Sim, Itapeva já conta com a Lei de Metas."]);
    map.set("Limeira", ["Limeira já tem plano de metas.", "A cidade de Limeira já conta com a Lei Municipal de Metas."]);
    map.set("Louveira", ["Louveira já tem plano de metas.", "Sim, a cidade de Louveira possui a Lei Municipal de Metas."]);
	map.set("Mauá", ["Mauá já tem plano de metas.", "Mauá já conta com a Lei de Metas."]);
	map.set("Mirassol", ["Mirassol já tem plano de metas.", "Sim, Mirassol possui a Lei Municipal de Metas."]);
	map.set("Penápolis", ["Penápolis já tem plano de metas.", "Sim, Penápolis já conta com a Lei de Metas."]);
	map.set("Ribeirão Bonito", ["Ribeirão Bonito já tem plano de metas.", "Sim, Ribeirão Preto conta com a Lei Municipal Metas."]);
	map.set("Ribeirão Preto", ["Ribeirão Preto já tem plano de metas.", "Sim, Ribeirão Preto já possui a Lei de Metas", "A cidade de Ribeirão Preto, já implantou a Lei de Metas"]);
	map.set("São Carlos", ["Sim, São Carlos implantou a Lei de Metas", "A cidade de São Carlos já implantou a Lei Municipal de Metas", "Sim, já foi implantada a Lei de Metas na cidade de São Carlos"]);
	map.set("São José do Rio Preto", ["São José do Rio Preto já tem plano de metas.", "São José do Rio Preto já implantou a Lei de Metas", "Sim, a cidade de São José do Rio Preto possui a Lei Municipal de Metas"]);
	map.set("Santos", ["Santos já tem plano de metas.", "Sim, Santos já possui a Lei de Metas", "Sim, Santos implantou a Lei Municipal de Metas"]);
	map.set("São Paulo", ["São paulo foi a primeira cidade a implantar a Lei de Metas.", "Sim, São Paulo já implantou a Lei de Metas", "Sim, São Paulo, já implantou a Lei Municipal de Metas. Inclusivo foi a primeira cidade a implanta-la."]);
	map.set("Taubaté", ["Sim, Taubaté implantou a Lei de Metas", "Sim, Taubaté já implantou a Lei Municipal de Metas", "Taubaté já implantou a Lei de Metas"]);
	map.set("Jaboticabal", ["Sim, Jaboticabal implantou a Lei de Metas", "Sim, a cidade de Jaboticabal conta com a Lei de Metas", "A cidade de Jaboticabal já utiliza a Lei de Metas"]);
    map.set("Jundiaí", ["Sim, Jundiaí esta usando a o Plano de Metas.", "A cidade de Jundiaí, já implantou a Lei Municipal de Metas", "Sim, a cidade de Jundiaí possui a Lei de Metas"]);

module.exports = map;


//console.log("TEST RAND -> ", map.get("Teste")[Math.floor(Math.random()*map.get("Teste").length)]);