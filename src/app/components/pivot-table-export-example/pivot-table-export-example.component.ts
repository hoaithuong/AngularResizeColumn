import * as React from 'react';
import * as uuid from 'uuid';
import * as ReactDOM from 'react-dom';
import * as invariant from 'invariant';
import { Component, OnInit } from '@angular/core';
import { PivotTable, Model } from '@gooddata/react-components';
import { ExampleWithExportComponent } from '../utils/example-with-export/example-with-export.component';
import {  
  projectId, 
  franchiseFeesIdentifier, 
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  locationStateDisplayFormIdentifier,
  locationNameDisplayFormIdentifier,
  menuCategoryAttributeDFIdentifier,
  quarterDateIdentifier,
  numberOfRestaurantsIdentifier,
  monthDateIdentifier,
  dateDataSetUri } from '../../../utils/fixtures';

  let self: any;

interface ChartProps {
  key: any;
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  sortBy?: any[];
  config: any;
  onColumnResized: any;
  onExportReady?: any;
  totals?: any[];
  pageSize?: number
}

@Component({
  selector: 'app-pivot-table-export-example',
  template: `

<div style="min-height: 400px;" class='example-with-source'>
<div class='example'>
  <div>
    <div>
      <span style="padding-right: 10px;" [id]="rootDomAttributeID"></span>
      <span style="padding-right: 10px;" [id]="rootDomMeasureID"></span>
      <!-- <span style="padding-right: 10px;" [id]="rootDomStateID"></span> -->
      <span [id]="rootDomResetID"></span>
    </div>
    <hr class="separator"/>
    <div><div style ="height: 400px"><div style ="height: 330px" [id]="rootDomID"></div><app-example-with-export></app-example-with-export></div>
    
  </div>
  <p>columns state: </p>
  <span style="padding-top: 10px;" [id]="rootDomStateID"></span>
</div>
</div>

`
})

export class PivotTableExportExampleComponent implements OnInit {
  constructor(private ExportComponent: ExampleWithExportComponent) { }

  measures = [
    Model.measure(numberOfRestaurantsIdentifier)
        .format("#,##0")
        .localIdentifier("franchiseFees")
        .alias("Fees Fees Fees"),
  ];
  attributes = [Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state")];

  columns = [Model.attribute(quarterDateIdentifier).localIdentifier("quarterDate")];

  sortBy = [Model.attributeSortItem("category", "asc")];
  totals = [
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "sum",
      attributeIdentifier: "state",
    }
  ]

  attributeWidth = width => Model.attributeColumnWidthItem("state", width);

  isAttributeColumnWidthItem = columnWidthItem => {
    return columnWidthItem && columnWidthItem.attributeColumnWidthItem !== undefined;
  };

  isMeasureColumnWidthItem = columnWidthItem => {
    return columnWidthItem && columnWidthItem.measureColumnWidthItem !== undefined;
  };

  isLocatorsEqual = (locator1, locator2) => {
    return (
      locator1[0].attributeLocatorItem.element === locator2[0].attributeLocatorItem.element &&
      locator1[1].measureLocatorItem.measureIdentifier === locator2[1].measureLocatorItem.measureIdentifier
    );
  };

  isSameWidthItem = (item, newItem) => {
    if (this.isAttributeColumnWidthItem(item) && this.isAttributeColumnWidthItem(newItem)) {
      return (
        item.attributeColumnWidthItem.attributeIdentifier ===
        newItem.attributeColumnWidthItem.attributeIdentifier
      );
    }

    if (this.isMeasureColumnWidthItem(item) && this.isMeasureColumnWidthItem(newItem)) {
      return this.isLocatorsEqual(item.measureColumnWidthItem.locators, newItem.measureColumnWidthItem.locators);
    }

    return false;
  };
  
  measureWidth = width =>
    Model.measureColumnWidthItem("franchiseFees", width).attributeLocators({
      attributeIdentifier: "quarterDate",
      element: `/gdc/md/${projectId}/obj/2009/elements?id=1`,
    });

  state = {
    columnWidths: [],
    autoResize: false,
    gridTableCount: 0,
  };

  // onButtonClick = columnWidthItem => {
  //   self.state.columnWidths= [columnWidthItem],
  //   self.render()
  // }

  onButtonClick = columnWidthItem => {
    const filteredColumnWidths = self.state.columnWidths.filter(
      item => !this.isSameWidthItem(item, columnWidthItem),
    );
    self.state.columnWidths= [...filteredColumnWidths, columnWidthItem]
    self.render()
  };

  onColumnResized = columnWidths => {
    self.state.columnWidths = columnWidths;
    self.render()
  };

  onAutoResizeChanged = () => {
    self.state(prevState => ({
        autoResize: !prevState.autoResize,
        gridTableCount: prevState.gridTableCount + 1,
    }));
    self.render()
  };
  
  public rootDomID: string;
  public rootDomStateID: string;
  public rootDomAttributeID: string;
  public rootDomMeasureID: string;
  public rootDomResetID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getStateRootDomNode() {
    const node = document.getElementById(this.rootDomStateID);
    invariant(node, `Node '${this.rootDomStateID} not found!`);
    return node;
  }

  protected getAttributeRootDomNode() {
    const node = document.getElementById(this.rootDomAttributeID);
    invariant(node, `Node '${this.rootDomAttributeID} not found!`);
    return node;
  }

  protected getMeasureRootDomNode() {
    const node = document.getElementById(this.rootDomMeasureID);
    invariant(node, `Node '${this.rootDomMeasureID} not found!`);
    return node;
  }

  protected getResetRootDomNode() {
    const node = document.getElementById(this.rootDomResetID);
    invariant(node, `Node '${this.rootDomResetID} not found!`);
    return node;
  }

  protected getProps(): ChartProps {
    return {
      key:`PivotTableKey-${this.state.gridTableCount}`,
      projectId: projectId,
      measures: this.measures,
      rows: this.attributes,
      columns: this.columns,
      onColumnResized: this.onColumnResized,
      onExportReady: this.ExportComponent.onExportReady,
      config: {
        columnSizing: {
            columnWidths: [...this.state.columnWidths],
            // defaultWidth: this.state.autoResize ? "viewport" : "unset",
            defaultWidth: "viewport",
            growToFit: false,
        },
        menu: {
          aggregations: true,
          aggregationsSubMenu: true,
        },
      },
      pageSize: 20
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {

      ReactDOM.render(React.createElement(PivotTable, this.getProps()), this.getRootDomNode());

      ReactDOM.render(React.createElement(
        "button",
        {
          className: "gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-attribute",
          onClick: function () {
            self.onButtonClick(self.attributeWidth(400));
          }
        },
        "Change Location State column width to 400"
      ), this.getAttributeRootDomNode());

      ReactDOM.render(React.createElement(
        "button",
        {
          className: "gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-measure",
          onClick: function () {
            self.onButtonClick(self.measureWidth(1));
          }
        },
        "Change Q1 column width to 60"
      ), this.getMeasureRootDomNode());

      ReactDOM.render(React.createElement("label", {
        style: {
          paddingLeft: 50
        }
      }, "Auto resize:", React.createElement("input", {
        className: "s-pivot-table-sizing-complex-autoresize-checkbox",
        name: "autoresize-checkbox",
        type: "checkbox",
        checked: self.state.autoResize,
        onChange: self.onAutoResizeChanged
      })), this.getResetRootDomNode());

      ReactDOM.render(
      React.createElement("div", {
        className: "s-pivot-table-sizing-complex-callback"
      }, JSON.stringify(self.state.columnWidths)),this.getStateRootDomNode());
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
    this.rootDomStateID = uuid.v4();
    this.rootDomAttributeID = uuid.v4();
    this.rootDomMeasureID = uuid.v4();
    this.rootDomResetID = uuid.v4();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}
