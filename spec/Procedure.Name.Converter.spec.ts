import 'reflect-metadata';
import { ProcedureNameConverterImpl } from '../src/data-layer/implementations/Procedure.Name.Converter';

test('Convert', () => {
    [
        {input: 'TEST_PROC', expected: 'testProc'},
        {input: 'TeSt_pRoC', expected: 'testProc'},
        {input: 'testProc', expected: 'testProc'},
        {input: 'find_user_and_roles', expected: 'findUserAndRoles'}
    ].forEach(tst => {
        expect(ProcedureNameConverterImpl(tst.input)).toBe(tst.expected);
    });
})