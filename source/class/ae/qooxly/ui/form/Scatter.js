qx.Class.define("ae.qooxly.ui.form.Scatter", {
	extend : qx.ui.container.Composite,

	construct : function() {
		this.base(arguments);
		var layout = new qx.ui.layout.VBox;
		this.setLayout(layout);
		layout.setSeparator("separator-vertical");
		this.setWidth(250);

		var container = new qx.ui.container.Composite(
				new qx.ui.layout.VBox()).set({
			padding : 10
		});
		
		var scroll = new qx.ui.container.Scroll().set({
			allowGrowY : true
		});
		
		scroll.add(container);
		
		var form = new qx.ui.form.Form();

		var connectgapsCheckBox = new qx.ui.form.CheckBox();
		
		var showlegendCheckBox = new qx.ui.form.CheckBox();
		var visibleCheckBox = new qx.ui.form.CheckBox();
		
		
		var modeSelectBox = new qx.ui.form.SelectBox();
		var modes = [
          {label: this.tr("Markers"), data: "markers"},
          {label: this.tr("Lines"), data: "lines"},
          {label: this.tr("Text"), data: "text"},
          {label: this.tr("Markers and Text"), data: "markers+text"},
          {label: this.tr("Lines and Text"), data: "lines+text"},
          {label: this.tr("Markers and Lines"), data: "markers+lines"},
          {label: this.tr("Markers, Lines and Text"), data: "markers+lines+text"}
        ];
        var smodel = qx.data.marshal.Json.createModel(modes);
        var ssController = new qx.data.controller.List(null, modeSelectBox);
	    ssController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
	    ssController.setModel(smodel);	      

	    var fillSelectBox = new qx.ui.form.SelectBox();
		var fill = [
          {label: this.tr("None"), data: "none"},
          {label: this.tr("To zero y"), data: "tozeroy"},
          {label: this.tr("To zero x"), data: "tozerox"},
          {label: this.tr("To next y"), data: "tonexty"},
          {label: this.tr("To next x"), data: "tonextx"},
          {label: this.tr("To self"), data: "toself"},
          {label: this.tr("To next"), data: "tonext"},
        ];
        var fmodel = qx.data.marshal.Json.createModel(fill);
        var fController = new qx.data.controller.List(null, fillSelectBox);
	    fController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
	    fController.setModel(fmodel);		      
	    var fillcolorField = new ae.qooxly.ui.ColorField();
	    
		var nameTf = new qx.ui.form.TextField();
		
		var colortextTf = new ae.qooxly.ui.ColorField();
		var familytextTf = new qx.ui.form.TextField();
		var sizetextTf = new qx.ui.form.Spinner();
		
		var sOpacity = this.sOpacity = new qx.ui.form.Slider().set({
			minimum: 0,
			maximum: 100,
			singleStep: 1
			//value: 0,
			//maxHeight:20
        });
		
		var textposition = new qx.ui.form.SelectBox();
		var pos = [
          {label: this.tr("Top left"), data: "top left"},
          {label: this.tr("Top center"), data: "top center"},
          {label: this.tr("Top right"), data: "top right"},
          {label: this.tr("Middle left"), data: "middle left"},
          {label: this.tr("Middle center"), data: "middle center"},
          {label: this.tr("Middle right"), data: "middle right"},
          {label: this.tr("Bottom left"), data: "bottom left"},
          {label: this.tr("Bottom center"), data: "bottom center"},
          {label: this.tr("Bottom right"), data: "bottom right"}
        ];
        var tmodel = qx.data.marshal.Json.createModel(pos);
        var tController = new qx.data.controller.List(null, textposition);
	    tController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
	    tController.setModel(tmodel);	
	    
		var xaxis = new qx.ui.form.TextField();
		var yaxis = new qx.ui.form.TextField();
		
		var linecolor = this.linecolor = new ae.qooxly.ui.ColorField();
		var linewidth = new qx.ui.form.Spinner();
		var dash = new qx.ui.form.SelectBox();
		var dashs = [
          {label: this.tr("Solid"), data: "solid"},
          {label: this.tr("Dot"), data: "dot"},
          {label: this.tr("Dash"), data: "dash"},
          {label: this.tr("Long dash"), data: "longdash"},
          {label: this.tr("Dash dot"), data: "dashdot"},
          {label: this.tr("Long dash dot"), data: "longdashdot"}
        ];
        var dashmodel = qx.data.marshal.Json.createModel(dashs);
        var dashController = new qx.data.controller.List(null, dash);
        dashController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
	    dashController.setModel(dashmodel);
	    
	    var lineshape = new qx.ui.form.SelectBox();
		var lineshapes = [
          {label: this.tr("Linear"), data: "linear"},
          {label: this.tr("Spline"), data: "spline"},
          {label: this.tr("HV"), data: "hv"},
          {label: this.tr("VH"), data: "vh"},
          {label: this.tr("HVH"), data: "hvh"},
          {label: this.tr("VHV"), data: "vhv"}
        ];
        var lineshapemodel = qx.data.marshal.Json.createModel(lineshapes);
        var lineshapeController = new qx.data.controller.List(null, lineshape);
        lineshapeController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
        lineshapeController.setModel(lineshapemodel);
	    
		var symbol = new qx.ui.form.SelectBox();
		var symbols = [
          {label: this.tr("Circle"), data: "circle"},
          {label: this.tr("Square"), data: "square"},
          {label: this.tr("Triangle"), data: "triangle-up"},
          {label: this.tr("Star"), data: "star"}
        ];
        var symbolmodel = qx.data.marshal.Json.createModel(symbols);
        var symbolController = new qx.data.controller.List(null, symbol);
        symbolController.setDelegate({bindItem: function(controller, item, index) {
	        controller.bindProperty("label", "label", null, item, index);
	        controller.bindProperty("data", "model", null, item, index);
	    }});
	    symbolController.setModel(symbolmodel);
	    var markersize = new qx.ui.form.Spinner(6);
	    var markercolor = new ae.qooxly.ui.ColorField();
	    var markeropacity = this.mOpacity = new qx.ui.form.Slider().set({
			minimum: 0,
			maximum: 100,
			singleStep: 1
        });
		
	    var dsid = new qx.ui.form.TextField();
	    var formatter = new qx.ui.form.TextField().set({enabled:false});
	    var x = new qx.ui.form.Spinner();
	    var y = new qx.ui.form.Spinner();
	    var text = new qx.ui.form.Spinner();
		var parameters = new qx.ui.form.TextArea().set({
			placeholder:'{\n"x":"0",\n"y":"1"\n}'
		});
		
		this.ptfcontroller = new qx.data.controller.Form(null, form);
		
		/*var clazz = qx.Class.getByName("ae.chart.model.trace.Scatter"); 
		var props = qx.Class.getProperties(clazz); 
		var props = qx.util.PropertyUtil.getAllProperties(clazz);
		console.log(props);*/
		
    	
		/*var exclude = ["type","dx","dy","r","t","x0","y0","x","y","line","marker"];
		for (var prop in props) {
			if(exclude.indexOf(prop)!=-1 ){continue;}
			switch(props[prop].check){
				case "Boolean":
					form.add(new qx.ui.form.CheckBox(),this.tr(prop),null,prop);
					break;
				case "Number":
					form.add(new qx.ui.form.Spinner(),this.tr(prop),null,prop);
					break;
				case "Array":
					form.add(new qx.ui.form.TextField(),this.tr(prop),null,prop);
					this.ptfcontroller.addBindingOptions(prop, {
						converter : function(value) {
							return (value) ? value.toString() : "";
						}
					},
					{
						converter : function(value) {
							var data = [];
							value = value.split(",");
							for(var i=0;i<value.length;i++){
								//var reg = new RegExp('/^\d+$/');
								//if(reg.test(value[i])){
									data.push(parseFloat(value[i]));
								//}else{
								//	data.push(value[i]);
								//}
							}
							if (value!="") {return data};
						}
					});
					break;
					default :
					form.add(new qx.ui.form.TextField(),this.tr(prop),null,prop);
					this.ptfcontroller.addBindingOptions(prop, {
						converter : function(value) {
							if(value instanceof Array){value=value.toString();}
							if(typeof(value)==="boolean"){value=value.toString();}
							return (value) ? value : "";
						}
					},
					{
						converter : function(value) {
							if(value.indexOf(",")!=-1){value=value.split(",");}
							if(value=="true"){value=true;}
							if(value=="false"){value=false;}
							if (value!="") {return value};
						}
					});
			}
			
		}*/
		
		form.addGroupHeader("General");
		form.add(nameTf, this.tr("Name"),null,"name");
		this.ptfcontroller.addBindingOptions("name", {
			converter : function(value) {
				return (value) ? value : "";
			}
		},
		{
			converter : function(value) {
				if (value!="") {return value};
			}
		});
		
		form.add(modeSelectBox, this.tr("Mode"),null,"mode");
		form.add(sOpacity, this.tr("Opacity"),null,"opacity");
		this.ptfcontroller.addBindingOptions("opacity", {
			converter : function(value) {
				return value*100;
			}
		},
		{
			converter : function(value) {
				return value/100;
			}
		});
		
		form.add(fillSelectBox, this.tr("Fill"),null,"fill");
		form.add(fillcolorField, this.tr("Fill color"),null,"fillcolor");
		this.ptfcontroller.addBindingOptions("fillcolor", {
			converter : function(value) {
				return (value) ? value : "";
			}
		},
		{
			converter : function(value) {
				if (value!="") {return value};
			}
		});
		
		form.add(connectgapsCheckBox,this.tr("Connect gaps"),null,"connectgaps");
		form.add(showlegendCheckBox,this.tr("Show legend"),null,"showlegend");
		form.add(visibleCheckBox,this.tr("Visible"),null,"visible");
		form.add(textposition,this.tr("Text position"),null,"textposition");
		form.add(xaxis,this.tr("X axis"),null,"xaxis");
		form.add(yaxis,this.tr("Y axis"),null,"yaxis");
		
		form.addGroupHeader("Marker");
		form.add(symbol,this.tr("Symbol"),null,"marker.symbol");
		form.add(markersize,this.tr("Size"),null,"marker.size");
		form.add(markercolor,this.tr("Color"),null,"marker.color");
		form.add(markeropacity, this.tr("Opacity"),null,"marker.opacity");
		this.ptfcontroller.addBindingOptions("marker.opacity", {
			converter : function(value) {
				return value*100;
			}
		},
		{
			converter : function(value) {
				return value/100;
			}
		});
		
		form.addGroupHeader("Line");
		form.add(linecolor,this.tr("Color"),null,"line.color");
		form.add(linewidth,this.tr("Width"),null,"line.width");
		form.add(dash,this.tr("Style"),null,"line.dash");
		form.add(lineshape,this.tr("Shape"),null,"line.shape");
		
		form.addGroupHeader("Font");
		form.add(familytextTf,this.tr("Font family"),null,"textfont.family");
		form.add(sizetextTf,this.tr("Font size"),null,"textfont.size");
		form.add(colortextTf,this.tr("Font color"),null,"textfont.color");
		
		form.addGroupHeader("Source");
		form.add(dsid,this.tr("Datasource"),null,"source.id");
		form.add(formatter,this.tr("Formatter"),null,"source.formatter");
		form.add(x,this.tr("X"),null,"source.parameters.x");
		form.add(y,this.tr("Y"),null,"source.parameters.y");
		form.add(text,this.tr("Text"),null,"source.parameters.text");

		/*form.add(parameters,this.tr("Parameters"),null,"source.parameters");
		
		this.ptfcontroller.addBindingOptions("source.parameters", {
			converter : function(value) {
				return (value) ? JSON.stringify(value) : null;
			}
		},
		{
			converter : function(value) {
				return (value || value!="") ? JSON.parse(value) : null;
			}
		});*/
		
		var renderedForm = new qx.ui.form.renderer.Single(form);
		renderedForm.getLayout().setColumnFlex(0,0);
		renderedForm.getLayout().setColumnFlex(1,1);
		
		
		
		container.add(renderedForm,{flex:1});
		
		/*var form2 = new qx.ui.form.Form();
		var x = new qx.ui.form.Spinner();
	    var y = new qx.ui.form.Spinner();
	    var text = new qx.ui.form.Spinner();
	    controller2 = new qx.data.controller.Form(null, form2);
		form2.add(x,this.tr("X"),null,"x");
		form2.add(y,this.tr("Y"),null,"y");
		form2.add(text,this.tr("Text"),null,"text");
		var renderedForm2 = new qx.ui.form.renderer.Single(form2);
		renderedForm2.getLayout().setColumnFlex(0,0);
		renderedForm2.getLayout().setColumnFlex(1,1);
		
		container.add(renderedForm2,{flex:1});*/
		
		this.add(scroll,{flex:1});
    	
    	/*this.controller.bind("selection[0]", this.ptfcontroller, "model",{
    		converter : function(value){
    			if(value!=null){
    				if(value.getTextfont()==null){
        				value.setTextfont(new ae.chart.model.Font());
        			}
    				if(value.getMarker()==null){
        				value.setMarker(new ae.chart.model.trace.auxiliary.Marker());
        			}
    				if(value.getType()=="scatter" && value.getLine()==null){
        				value.setLine(new ae.chart.model.trace.auxiliary.Line());
        			}
    				if(value.getSource()==null){
    					var src = new ae.chart.model.trace.auxiliary.Source();
    					var model = qx.data.marshal.Json.createModel({x:0,y:1,text:null},true);
    					src.setParameters(model);
    					src.setFormatter("CSV");
        				value.setSource(src);
        			}
    			}

    			return value;
    		}
    	});*/
	}
})