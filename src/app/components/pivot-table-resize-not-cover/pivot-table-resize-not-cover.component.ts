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

interface PivotTableBucketProps {
  projectId: any;
  measures?: any[];
  rows?: any[];
  columns?: any[];
  sortBy?: any[];
  config: any;
}

interface PivotTableProps {
  projectId: any;
}

@Component({
  selector: 'app-pivot-table-resize-not-cover',
  template: '<div class="pivot-table" style="height:500px" [id]="rootDomID"></div>',
})
export class PivotTableResizeNotCoverComponent implements OnInit {

  measures = [
    Model.measure(franchiseFeesIdentifier).format("#,##0").localIdentifier('franchiseFeesIdentifier').title("Franchised Fees"),
    Model.measure(franchiseFeesAdRoyaltyIdentifier).format("#,##0").localIdentifier('franchiseFeesAdRoyaltyIdentifier').title("Franchise Fees (AdRoyalty)"),
    // Model.measure(franchiseFeesInitialFranchiseFeeIdentifier).format("#,##0").localIdentifier('franchiseFeesInitialFranchiseFeeIdentifier').title("franchiseFees (Initial)"),
    // Model.measure(franchiseFeesIdentifierOngoingRoyalty).format("#,##0").localIdentifier('franchiseFeesIdentifierOngoingRoyalty').title("Franchise Fees (OngoingRoyalty)"),
  ]
  rows = [
    Model.attribute(locationStateDisplayFormIdentifier).localIdentifier("state"),
    // Model.attribute(locationNameDisplayFormIdentifier).localIdentifier("name"),
    Model.attribute(menuCategoryAttributeDFIdentifier).localIdentifier("category"),
  ]
  // columns = [
  //   Model.attribute(quarterDateIdentifier).localIdentifier('quarterDate'), 
  //   Model.attribute(monthDateIdentifier).localIdentifier('monthDate')
  // ]

  sortBy = [Model.attributeSortItem("category", "asc")];

  attributeWidth = width => Model.attributeColumnWidthItem("state", width);
  allColumn = width => Model.allMeasureColumnWidthItem(width);
  measureWidth = width =>
    Model.measureColumnWidthItem("franchiseFeesIdentifier", width);
    // .attributeLocators(
    //     {
    //         attributeIdentifier: "quarterDate",
    //         element: quarterDateIdentifierQ1 
    //     },
    //     {
    //         attributeIdentifier: "monthDate",
    //         element: monthDateIdentifierJanuary 
    //     }
    // );

  state = {
    columnWidths: [this.attributeWidth(200), this.measureWidth(200)],
  };
  
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): PivotTableProps | PivotTableBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      rows: this.rows,
      // columns: this.columns,
      sortBy: this.sortBy,
      config:{
          columnSizing: {
            columnWidths: [
              this.attributeWidth(400),
              this.measureWidth(100),
              this.allColumn(-50000000000)
            ],
            defaultWidth: "viewport",
            growToFit: true
          }

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

