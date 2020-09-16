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
  franchiseFeesIdentifierOngoingRoyalty,
  menuCategoryAttributeDFIdentifier,
  quarterDateIdentifierQ1,
  quarterDateIdentifierQ2,
  monthDateIdentifierJanuary,
  monthDateIdentifierFeb,
  monthDateIdentifierApril,
} from '../../../utils/fixtures.js';

let self: any;

interface PivotTableBucketProps {
  projectId: any;
  filters: any[];
  measures?: any[];
  rows?: any[];
  columns?: any[];
  sortBy?: any[];
  config: any;
  onColumnResized: any;
  totals: any[];
}

interface PivotTableProps {
  projectId: any;
}

@Component({
  selector: 'app-pivot-table-resize-button',
  templateUrl: './pivot-table-resize-button.component.html',
  styleUrls: ['./pivot-table-resize-button.component.css']
})

export class PivotTableResizeButtonComponent implements OnInit {

  measures = [
    Model.measure(franchiseFeesIdentifier).format("#,##0").localIdentifier('franchiseFeesIdentifier').title("Franchised Fees"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0").localIdentifier('franchiseFeesAdRoyaltyIdentifier').title("Franchise Fees (AdRoyalty)"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier).format("#,##0").localIdentifier('franchiseFeesInitialFranchiseFeeIdentifier').title("franchiseFees (Initial)"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty).format("#,##0").localIdentifier('franchiseFeesIdentifierOngoingRoyalty').title("Franchise Fees (OngoingRoyalty)"),
  ]
  rows = [
    Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state"),
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("name"),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("category"),
  ]
  columns = [
    Model.attribute(quarterDateIdentifier).localIdentifier('quarterDate'), 
    Model.attribute(monthDateIdentifier).localIdentifier('monthDate')
  ]

  sortBy = [Model.attributeSortItem("category", "asc")];
  totals = [
    {
      measureIdentifier: "franchiseFeesIdentifier",
      type: "sum",
      attributeIdentifier: "state",
    }
  ]

  attributeWidth = width => Model.attributeColumnWidthItem("state", width);
  
  measureWidth = width =>
    Model.measureColumnWidthItem("franchiseFeesIdentifier", width)
    .attributeLocators(
        {
            attributeIdentifier: "quarterDate",
            element: quarterDateIdentifierQ1 
        },
        {
            attributeIdentifier: "monthDate",
            element: monthDateIdentifierJanuary 
        }
    );

  state = {
    columnWidths: [this.attributeWidth(500), this.measureWidth(1)],
  };
  filters = [
    {
        positiveAttributeFilter: {
            displayForm: {
                identifier: quarterDateIdentifier
            },
            in: ['Q1'],
            textFilter: true
        }
    },
    {
        positiveAttributeFilter: {
            displayForm: {
                identifier: monthDateIdentifier
            },
            in: ['Jan'],
            textFilter: true
        }
    }
]

  onButtonClick = columnWidthItem => {
    self.state.columnWidths= [columnWidthItem],
    self.render()
  }

  onColumnResized = columnWidths => {
    self.columnWidths = columnWidths;
    self.render()
  };
  
  public rootDomID: string;
  public rootDomAttributeID: string;
  public rootDomMeasureID: string;
  public rootDomResetID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
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
      projectId: projectId,
      measures: this.measures,
      rows: this.rows,
      columns: this.columns,
      sortBy: this.sortBy,
      totals: this.totals,
      filters: this.filters,
      onColumnResized: this.onColumnResized,
      config:{
        columnSizing: {
          columnWidths: [
            ...this.state.columnWidths
          ],
          defaultWidth: "viewport",
          growToFit: true
        },
        menu: {
          aggregations: true,
          aggregationsSubMenu: true,
        }
      }
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

      ReactDOM.render(React.createElement(
        "button",
        {
          className: "gd-button gd-button-secondary gd-button gd-button-secondary s-change-width-button-remove",
            onClick: function () {
              self.state.columnWidths= [],
              self.render()
            }
        },
        "Remove column widths"
      ), this.getResetRootDomNode());
    
  }

  ngOnInit() {
    self = this;
    this.rootDomID = uuid.v4();
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
