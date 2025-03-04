document.addEventListener('DOMContentLoaded', function() {
    const table = $('#webAppsTable').DataTable({
        ajax: {
            url: '/api/webapps',
            dataSrc: ''
        },
        columns: [
            { data: 'name' },
            { data: 'status' },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <button class="start-btn" data-id="${row.id}" ${row.status === 'Running' ? 'disabled' : ''}>Start</button>
                        <button class="stop-btn" data-id="${row.id}" ${row.status === 'Stopped' ? 'disabled' : ''}>Stop</button>
                    `;
                }
            }
        ],
        "pagingType": "simple_numbers",
        "lengthMenu": [5, 10, 25, 50],
        "pageLength": 10,
        "order": [[0, "asc"]],
        "language": {
            "paginate": {
                "previous": "&laquo;",
                "next": "&raquo;"
            }
        }
    });

    $('#webAppsTable tbody').on('click', '.start-btn', function() {
        const appId = $(this).data('id');
        $.ajax({
            url: `/api/webapps/${appId}/start`,
            method: 'POST',
            success: function() {
                table.ajax.reload();
            },
            error: function() {
                alert('Failed to start the web app.');
            }
        });
    });

    $('#webAppsTable tbody').on('click', '.stop-btn', function() {
        const appId = $(this).data('id');
        $.ajax({
            url: `/api/webapps/${appId}/stop`,
            method: 'POST',
            success: function() {
                table.ajax.reload();
            },
            error: function() {
                alert('Failed to stop the web app.');
            }
        });
    });
});