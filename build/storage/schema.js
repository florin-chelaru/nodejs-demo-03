"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports the Google Cloud client library
var spanner_1 = require("@google-cloud/spanner");
function createDatabase(databaseId, instanceId, projectId) {
    if (databaseId === void 0) { databaseId = 'nodejs-demo-03'; }
    if (instanceId === void 0) { instanceId = 'nodejs-demo-03'; }
    if (projectId === void 0) { projectId = 'florinc-test-project-2'; }
    return __awaiter(this, void 0, void 0, function () {
        var spanner, instance, request, _a, database, operation;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("projectId: " + projectId);
                    console.log("instanceId: " + instanceId);
                    console.log("databaseId: " + databaseId);
                    spanner = new spanner_1.Spanner({
                        projectId: projectId,
                    });
                    instance = spanner.instance(instanceId);
                    request = {
                        schema: [
                            "CREATE TABLE Books (\n      BookId STRING(MAX) NOT NULL,\n      Description STRING(MAX),\n      Title STRING(MAX),\n    ) PRIMARY KEY (BookId)",
                            "CREATE TABLE Chapters (\n      BookId STRING(MAX) NOT NULL,\n      ChapterId STRING(MAX) NOT NULL,\n      Description STRING(MAX),\n      Page INT64,\n      Title STRING(MAX),\n    ) PRIMARY KEY (BookId, ChapterId),\n    INTERLEAVE IN PARENT Books ON DELETE CASCADE",
                        ],
                    };
                    return [4 /*yield*/, instance.createDatabase(databaseId, request)];
                case 1:
                    _a = _b.sent(), database = _a[0], operation = _a[1];
                    console.log("Waiting for operation on " + database.id + " to complete...");
                    return [4 /*yield*/, operation.promise()];
                case 2:
                    _b.sent();
                    console.log("Created database " + databaseId + " on instance " + instanceId + ".");
                    return [2 /*return*/];
            }
        });
    });
}
var args = process.argv.slice(2);
createDatabase.apply(void 0, args).catch(console.error);
