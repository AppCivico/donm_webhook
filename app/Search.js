function Search() {
	
	this._district;
	this._theme;
	this._type;
	this.mCurrent;

	Search.prototype.getDistrict = function(){
		return this._district
	}

	Search.prototype.setDistrict = function(value){
		this._district = value
	}

	Search.prototype.getTheme = function(){
		return this._theme;
	}

	Search.prototype.setTheme = function(value){
		this._theme = theme;
	}

	Search.prototype.getType = function(){
		return this._type;
	}

	Search.prototype.setType = function(value){
		this._vType = value;
	}

	Search.prototype.getId = function(){
		return this._id;
	}

	Search.prototype.setId = function(value){
		this._id = value;
	}
}