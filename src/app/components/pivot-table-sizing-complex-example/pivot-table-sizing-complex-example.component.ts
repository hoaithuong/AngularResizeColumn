import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import '@gooddata/react-components/styles/css/main.css';
import { PivotTable, Model } from '@gooddata/react-components';
import {
  projectId,
  quarterDateIdentifier,
  monthDateIdentifier,
  locationStateDisplayFormIdentifier,
  locationNameDisplayFormIdentifier,
  franchiseFeesIdentifier,
  franchiseFeesAdRoyaltyIdentifier,
  franchiseFeesInitialFranchiseFeeIdentifier,
  franchisedSalesIdentifier,
  franchiseFeesIdentifierOngoingRoyalty,
  menuCategoryAttributeDFIdentifier,
  quarterDateIdentifierQ1,
  quarterDateIdentifierQ2,
  monthDateIdentifierJanuary,
  monthDateIdentifierFeb,
  monthDateIdentifierApril,
  numberOfRestaurantsIdentifier,
  totalSalesIdentifier,
  franchiseFeesTag
} from '../../../utils/fixtures.js';

let self: any;

interface PivotTableBucketProps {
  key: any;
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  sortBy?: any[];
  config: any;
  onColumnResized: any;
  totals: any[];
  pageSize: number
}

interface PivotTableProps {
  projectId: any;
}

@Component({
  selector: 'app-pivot-table-sizing-complex-example',
  templateUrl: './pivot-table-sizing-complex-example.component.html',
  styleUrls: ['./pivot-table-sizing-complex-example.component.css']
})
export class PivotTableSizingComplexExampleComponent implements OnInit {
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

  protected getProps(): PivotTableProps | PivotTableBucketProps {
    return {
      key:`PivotTableKey-${this.state.gridTableCount}`,
      projectId: projectId,
      measures: this.measures,
      rows: this.attributes,
      columns: this.columns,
      // sortBy: this.sortBy,
      // totals: this.totals,
      onColumnResized: this.onColumnResized,
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
        }
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
