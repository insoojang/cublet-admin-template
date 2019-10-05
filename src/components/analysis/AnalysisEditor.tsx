import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';

class AnalysisEditor extends Component {
    render() {
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' },
        ];
        const rows = [
            {
                id: 0, title: 'row1', count: 20,
            },
            {
                id: 1, title: 'row1', count: 40,
            },
            {
                id: 2, title: 'row1', count: 60,
            },
        ];
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={i => rows[i]}
                rowsCount={3}
                minHeight={150}
            />
        );
    }
}
export default AnalysisEditor;
