import Student from '../models/Student';
import generateID from '../utils/GenerateID';

class GenerateAcademicRecord {
  async generateUniqueAR() {
    try {
      const ar = generateID();
      const exists = await Student.findOne({ where: { academic_record: ar } });

      if (exists) {
        this.generateUniqueAR();
      }

      return ar;
    } catch (error) {
      throw Error('Não foi possível criar o número para o registro acadêmico.');
    }
  }
}

export default new GenerateAcademicRecord();
