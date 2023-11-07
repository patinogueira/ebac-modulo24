const req = require('supertest');
const API_URL = process.env.API_URL;
const { getAccessToken } = require('../utils/request');
const faker = require('faker');
const contrato = require('../contratos/clientes.contrato');

describe('clientes', () => {
    let token
    beforeAll(async () => {
        token = await getAccessToken('admin', 'admin')
    });


    it('Deve validar contrato de clientes', async() => {
        await req(API_URL)
        .get('/customers')
        .set('Accept', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .then(response => {
            console.log(response.body); 
            return contrato.validateAsync(response.body)
    })});

    it('deve listar os clientes cadastrados ', async () => {
        await req(API_URL)
            .get('/customers')
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(200)
                expect(response.body).toBeInstanceOf(Array)
            })
    });
    it('(E2Ecliente) deve cadastrar um endereco para cadastrar um cliente valido', async () => {

        let address_1 = faker.address.streetAddress()
        await req(API_URL)
            .post('/addresses')
            .send({
                "address_1": address_1,
                "address_2": faker.address.streetName(),
                "city": faker.address.city(),
                "state": faker.address.state(),
                "zip": 0
            })
            .set('Accept', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .then(response => {
                expect(response.statusCode).toEqual(201)
                expect(response.body.updatedAt).not.toBe(undefined)
                expect(response.body.address_1).toEqual(address_1)
                id = response.body.id})

                await req(API_URL)
                    .post('/customers')
                    .send({
                        "address": {
                            "id": id
                        },
                        "email": faker.internet.email(),
                        "firstName": faker.name.firstName(),
                        "lastName": faker.name.lastName(),
                        "phone": faker.phone.phoneNumber()
                    })
                    .set('Accept', 'application/json')
                    .set('Authorization', `Bearer ${token}`)
                    .then(response => {
                        expect(response.statusCode).toEqual(201)
                        expect(response.body.updatedAt).not.toBe(undefined)
                    })
            });

    })
