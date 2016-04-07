/* ************************************************************************

   Copyright:

   License:

   Authors:

 ************************************************************************ */

/**
 * This is the main application class of qooxly. It's only used for testing.
 *
 * @asset(ae/qooxly/*)
 */
qx.Class.define("ae.qooxly.Application", {
	extend : qx.application.Standalone,

	properties :
	  {
	      /**
	       * Chart view
	       */
	      chartView : {
	          init : null
	      },
	      /**
	       * ToolBar
	       */
	      toolBar : {
	          init : null
	      },
	      /**
	       * Menu
	       */
	      menu : {
	          init : null
	      }
	  },
	  
	/*
	 *****************************************************************************
	   MEMBERS
	 *****************************************************************************
	 */

	members : {
		/**
		 * This method contains the initial application code and gets called 
		 * during startup of the application
		 * 
		 * @lint ignoreDeprecated(alert)
		 */
		main : function() {
			// Call super class
			this.base(arguments);

			qx.core.Environment.version = "0.1";
			
			// Enable logging in debug variant
			if (qx.core.Environment.get("qx.debug")) {
				// support native logging capabilities, e.g. Firebug for Firefox
				qx.log.appender.Native;
				// support additional cross-browser console. Press F7 to toggle visibility
				qx.log.appender.Console;
			}

			//set theme
	        qx.theme.manager.Meta.getInstance().setTheme(qx.theme.Indigo);

	        
	        //the application root
	        var root = this._root = this.getRoot();

	        //---------------------------Model-----------------------------------
	        var projectController = this.projectController = new ae.qooxly.controller.Project();

	        /*var model = new ae.map.model.Map();
	        this.setModelMap(model);


	        var mapController = this.mapController = new map.controller.Map();
	        this.setEditorView(new map.view.EditorView());*/
	        //--------------------------Header----------------------------------------------------
	        
	        var workbench = new qx.ui.container.Composite();

	        var layout = new qx.ui.layout.VBox;
	        //layout.setSeparator("separator-vertical");
	        workbench.setLayout(layout);

	        var header = new qx.ui.container.Composite(
	            new qx.ui.layout.HBox()).set({
	                decorator: null
	            });
	        //header.setAppearance("app-header");
	        var img = new qx.ui.basic.Image("ae/qooxly/app_header.png").set({
	            marginRight: 15
	        });
	        var title = this.title = new qx.ui.basic.Label("Qooxly <span style='color:#999; font-size:14px; font-weight:normal'>- Chart Editor</span>").set({
	            marginTop: 10,
	            marginLeft: 6,
	            rich: true,
	            textColor: "#333"
	        });
	        var myFont = new qx.bom.Font(18, ["Arial", "Segoe UI"]).set({
	            bold: true
	        });
	        title.setFont(myFont);
	        //title.setFont("Helvetica");

	        var version = new qx.ui.basic.Label("Version 0.1").set({
	            marginTop: 17,
	            marginRight: 40
	        });
	        version.setFont("default");

	        header.add(img);

	        var midHeader = new qx.ui.container.Composite(new qx.ui.layout.VBox());
	        midHeader.add(title);

	        this.setMenu(new ae.qooxly.ui.Menu());
	        midHeader.add(this.getMenu());

	        header.add(midHeader);
	        header.add(new qx.ui.core.Widget(),{flex:1});

	        workbench.add(header);
	        //----------------------------ToolBar-------------------------------------------------
	        this.setToolBar(new ae.qooxly.ui.ToolBar());
	        workbench.add(this.getToolBar());
	        //----------------------------Body----------------------------------------------------

	        var splitpane = new qx.ui.splitpane.Pane("horizontal").set({margin:5});
	        splitpane.getChildControl("splitter").setBackgroundColor("white");
	        
	        var qxchart = new ae.qooxly.ui.Chart();
	        
	        window.Qooxly=qxchart;
	        this.setChartView(qxchart);

	        splitpane.add(this.getChartView(), 2);
	        
	        var stack = this._stack = new qx.ui.container.Stack();
	        stack.__treeView = new ae.qooxly.ui.editor.Tree(qxchart);
	        stack.__jsonView = new ae.qooxly.ui.editor.Json(qxchart);
	        stack.__consoleView = new ae.qooxly.ui.editor.Code(qxchart);

		    //stack.setDecorator("main");
			stack.add(stack.__treeView );
			stack.add(stack.__jsonView);
			stack.add(stack.__consoleView);
			stack.resetSelection();
			stack.exclude();
			
			splitpane.add(stack, 0);
			
	        workbench.add(splitpane, {flex : 1});

	        root.add(workbench, {
	            edge : 0
	        });
            
			var trace1 = {
				x : [ 1, 2, 3, 4 ],
				y : [ 10, 15, 13, 17 ],
				mode : 'markers',
				type : 'scatter'
			};

			var trace2 = {
				x : [ 2, 3, 4, 5 ],
				y : [ 16, 5, 11, 9 ],
				mode : 'lines',
				type : 'scatter'
			};

			var trace3 = {
				x : [ 1, 2, 3, 4 ],
				y : [ 12, 9, 15, 12 ],
				mode : 'lines+markers',
				type : 'scatter'
			};

			var data = [ trace1, trace2 ];
			var layout={title:'Test'};
			
			qx.ui.core.queue.Manager.flush();
			
			//qxchart.plot(data,layout);
			qxchart.plot([],{});			
	        
	        //Check query parameters
	        var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i=0;i<vars.length;i++) {
                var pair = vars[i].split("=");
                if(pair[0] == "url"){
                	projectController.loadFromUrl(pair[1]);
                }
            }
		}
	}
});