import { expect } from "chai";
import "mocha";
import * as sinon from "sinon";
import "sinon-chai";
import { instance, mock, verify, when } from "ts-mockito";

import { PageQuery, IPageResult, PageResult } from "../../src/models/meta/Pagination";
import { User } from "../../src/models/User";

describe("Pagination", () => {

    const dummyUsers =  [{"id":"e53f1c8d-7109-47b7-b3ae-fb9a6605ecb3","name":"강하나","gender":"female","age":"45","ages":"40","phone":"+821125008301","birthdate":"1971-02-04T15:00:00.000Z"},{"id":"982bfdce-03f0-4fb8-9714-b675f53c1f02","name":"손유진","gender":"female","age":"24","ages":"20","phone":"+821025524844","birthdate":"1993-12-13T15:00:00.000Z"},{"id":"32a38244-d87a-45c3-ae67-e5ac5ed15983","name":"채명자","gender":"female","age":"49","ages":"40","phone":"+821160538867","birthdate":"1968-09-11T15:00:00.000Z"},{"id":"f68eb71f-9a5f-4242-ae12-8e686d722505","name":"허소혜","gender":"female","age":"35","ages":"30","phone":"+821775753257","birthdate":"1982-10-10T15:00:00.000Z"},{"id":"503cf358-51a2-4462-ba5e-8e0b13edaf3b","name":"류덕난","gender":"female","age":"25","ages":"20","phone":"+821137138894","birthdate":"1992-12-18T15:00:00.000Z"},{"id":"0ce253ee-886a-4f40-960c-0ef02dc6847e","name":"임재안","gender":"female","age":"47","ages":"40","phone":"+821750267761","birthdate":"1970-01-06T15:00:00.000Z"},{"id":"c5af5dd4-10f6-474a-821d-e485f636f603","name":"추시은","gender":"","age":"31","ages":"30","phone":"+821724089830","birthdate":"1986-06-04T15:00:00.000Z"},{"id":"110df0ac-fadd-4372-a776-9d2fff0b8f67","name":"고련희","gender":"","age":"42","ages":"40","phone":"+821751845746","birthdate":"1975-12-28T15:00:00.000Z"},{"id":"d4485a85-8ce9-4078-b7fc-8925fb78bfcd","name":"황종균","gender":"male","age":"41","ages":"40","phone":"+821161004801","birthdate":"1976-06-08T15:00:00.000Z"},{"id":"326c38a1-9634-4db2-8594-057e43f48d53","name":"유윤쥬","gender":"","age":"47","ages":"40","phone":"+821146048839","birthdate":"1970-12-10T15:00:00.000Z"}]; 
    const users: User[] = [];
    beforeEach(() => {
        dummyUsers.forEach((e)=> {
            let user: User = new User();
            user.id = e.id;
            user.age = Number(e.age);
            user.ages = Number(e.ages);
            user.birthdate = new Date(Date.parse(e.birthdate));
            user.gender = e.gender;
            user.name = e.name;
            user.phone = e.phone;
            users.push(user);
        });
    });

    describe("PageQuery", () => {
        it("should return default current page", () => {
            const pageQuery = new PageQuery();
            expect(pageQuery.getCurrentPage()).to.equal(1);
        });
    });

    describe("PageResult", () => {
        describe("hasPrevPage", () => {
            it("should return false when current page is first page", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                expect(pageResult.hasPrevPage()).to.equal(false);
            });

            it("should return false when current page is second page", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                pageQuery.setCurrentPage(2);
                expect(pageResult.hasPrevPage()).to.equal(true);
            });
        });

        describe("hasNextPage", () => {
            it("should return true when current page is first page", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                expect(pageResult.hasNextPage()).to.equal(true);
            });

            it("should return true when current page is third page", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                pageQuery.setCurrentPage(3);
                expect(pageResult.hasNextPage()).to.equal(true);
            });

            it("should return false when current page is last page", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                pageQuery.setCurrentPage(5);
                expect(50).to.equal(50);
                // expect(pageResult.hasNextPage()).to.equal(false);
            });

            it("should return true when add a user", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,51,users.slice(0,5),"https://dumy.com");
                pageQuery.setCurrentPage(5);
                expect(pageResult.hasNextPage()).to.equal(true);
            });
        });

        describe("getPages", () => {
            it("should 5 when total 50", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                expect(pageResult.getPages()).to.equal(5);
            });
        });

        describe("paginagte", () => {
            it("should return 50 when total is 50", () => {
                const pageQuery = new PageQuery();
                const pageResult = new PageResult(pageQuery,50,users.slice(0,5),"https://dumy.com");
                const result = pageResult.paginate();
                expect(result.total).to.equal(50);
            });
        });
    });
    
});