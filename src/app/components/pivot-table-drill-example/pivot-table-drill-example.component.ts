import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import '@gooddata/react-components/styles/css/main.css';
import { PivotTable, HeaderPredicateFactory, Model } from '@gooddata/react-components';
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

interface PivotTableDrillExampleBucketProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  totals?: any[];
  filters?: any[];
  sortBy?: any[];
  drillableItems?: any[];
  onFiredDrillEvent?: any;
  config: any;
}

interface PivotTableDrillExampleProps {
  projectId: any;
}

@Component({
  selector: 'app-pivot-table-drill-example',
  template: '<div class="pivot-table-drill-example" style="height:500px" [id]="rootDomID"></div>',
})
export class PivotTableDrillExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  onDrill = drillEvent => {
    console.log(
      "onFiredDrillEvent",
      drillEvent,
      JSON.stringify(drillEvent.drillContext.intersection, null, 2),
    );
    return true;
  };

  renderDrillValue() {
    let drillEvent;
    if (!drillEvent) {
      return null;
    }
  };

  drillableItems = [
    HeaderPredicateFactory.identifierMatch(menuCategoryAttributeDFIdentifier),
    HeaderPredicateFactory.identifierMatch(franchiseFeesIdentifier),
  ];

  measures = [
    Model.measure(franchiseFeesIdentifier).format("#,##0").localIdentifier('franchiseFeesIdentifier').title("Franchised Fees"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0").localIdentifier('franchiseFeesAdRoyaltyIdentifier').title("Franchise Fees (AdRoyalty)"),
    Model.measure(franchiseFeesInitialFranchiseFeeIdentifier).format("#,##0").localIdentifier('franchiseFeesInitialFranchiseFeeIdentifier').title("franchiseFees (Initial)"),
    Model.measure(franchiseFeesIdentifierOngoingRoyalty).format("#,##0").localIdentifier('franchiseFeesIdentifierOngoingRoyalty').title("Franchise Fees (OngoingRoyalty)"),
  ]

  rows = [
    Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state"),
    Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("name"),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("menu"),
  ]

  columns = [
    Model.attribute(quarterDateIdentifier).localIdentifier('quarterDate'), 
    Model.attribute(monthDateIdentifier).localIdentifier('monthDate')
  ]

  attributeWidth = width => Model.attributeColumnWidthItem("menu", width);

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
    columnWidths: [this.attributeWidth(200), this.measureWidth(200)],
  };

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PivotTableDrillExampleProps | PivotTableDrillExampleBucketProps {
    { this.renderDrillValue() }
    return {
      projectId: projectId,
      measures: this.measures,
      rows: this.rows,
      columns: this.columns,
      drillableItems: this.drillableItems,
      onFiredDrillEvent: this.onDrill,
      config:{
        columnSizing: {
          defaultWidth: "viewport",
          growToFit: true,
            columnWidths: [
                this.attributeWidth(400),
                this.measureWidth(60)
            ],
        },
    }
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(PivotTable, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
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
