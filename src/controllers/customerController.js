const controller = {};

controller.list = (req, res) => {
    req.getConnection((_err, conn) => {
        conn.query('SELECT * FROM customer', (_err, customers) => {
            if (_err) {
                res.json(_err);
            }


            res.render('customers', {
                data: customers
            });

        });
    });
};

controller.save = (req, res) => {
    const data = req.body;

    req.getConnection((_err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (_err, customer) => {

            res.redirect('/');
        });
    })
};



controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((_err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (_err, customer) => {
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((_err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (_err, rows) => {
            res.redirect('/');
        })
    })
};


controller.delete = (req, res) => {
    const { id } = req.params;

    req.getConnection((_err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (_err, rows) => {
            res.redirect('/')
        })
    });
};



module.exports = controller;
